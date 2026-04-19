import prisma from '../db/prisma';

let leadRegistrationTableReady = false;

export const webinarService = {
  // Create new webinar (Admin)
  async createWebinar(data: {
    title: string;
    image: string;
    description: string;
    teacher: string;
    date: string;
    time: string;
  }) {
    const webinar = await prisma.webinar.create({
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        teacher: data.teacher,
        date: new Date(data.date).toISOString(),
        time: data.time,
      },
    });
    return webinar;
  },

  // Get all active webinars
  async getAllWebinars() {
    const webinars = await prisma.webinar.findMany({
      where: { isActive: true },
      orderBy: [
        { date: 'asc' },
        { time: 'asc' },
      ],
    });
    return webinars;
  },

  // Get webinar by ID
  async getWebinarById(id: number) {
    const webinar = await prisma.webinar.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
    return webinar;
  },

  // Update webinar (Admin)
  async updateWebinar(id: number, data: Partial<{
    title: string;
    image: string;
    description: string;
    teacher: string;
    date: string;
    time: string;
    is_active: boolean;
  }>) {
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.teacher !== undefined) updateData.teacher = data.teacher;
    if (data.date !== undefined) updateData.date = new Date(data.date).toISOString();
    if (data.time !== undefined) updateData.time = data.time;
    if (data.is_active !== undefined) updateData.isActive = data.is_active;

    const webinar = await prisma.webinar.update({
      where: { id },
      data: updateData,
    });
    return webinar;
  },

  // Delete webinar (Admin)
  async deleteWebinar(id: number) {
    await prisma.webinar.delete({
      where: { id },
    });
  },

  // Register user for webinar
  async registerForWebinar(userId: number, webinarId: number) {
    const registration = await prisma.webinarRegistration.upsert({
      where: {
        userId_webinarId: {
          userId,
          webinarId,
        },
      },
      create: {
        userId,
        webinarId,
      },
      update: {},
    });
    return registration;
  },

  async registerLeadForWebinar(
    webinarId: number,
    data: {
      fullName: string;
      email: string;
      phoneNumber: string;
      collegeOrProfession: string;
      courseInterest: string;
      experienceLevel: string;
      referralSource?: string;
      questions?: string;
    }
  ) {
    if (!leadRegistrationTableReady) {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "webinar_lead_registrations" (
          "id" SERIAL PRIMARY KEY,
          "webinar_id" INTEGER NOT NULL REFERENCES "webinars"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          "full_name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "phone_number" TEXT NOT NULL,
          "college_or_profession" TEXT NOT NULL,
          "course_interest" TEXT NOT NULL,
          "experience_level" TEXT NOT NULL,
          "referral_source" TEXT,
          "questions" TEXT,
          "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "webinar_lead_registrations_webinar_id_email_key"
        ON "webinar_lead_registrations"("webinar_id", "email");
      `);

      leadRegistrationTableReady = true;
    }

    const normalizedEmail = data.email.trim().toLowerCase();
    const fullName = data.fullName.trim();
    const phoneNumber = data.phoneNumber.trim();
    const collegeOrProfession = data.collegeOrProfession.trim();
    const courseInterest = data.courseInterest.trim();
    const experienceLevel = data.experienceLevel.trim();
    const referralSource = data.referralSource?.trim() || null;
    const questions = data.questions?.trim() || null;

    const [registration] = await prisma.$queryRaw<
      Array<{
        id: number;
        webinarId: number;
        fullName: string;
        email: string;
        phoneNumber: string;
        collegeOrProfession: string;
        courseInterest: string;
        experienceLevel: string;
        referralSource: string | null;
        questions: string | null;
        registeredAt: Date;
        updatedAt: Date;
      }>
    >`
      INSERT INTO "webinar_lead_registrations" (
        "webinar_id",
        "full_name",
        "email",
        "phone_number",
        "college_or_profession",
        "course_interest",
        "experience_level",
        "referral_source",
        "questions"
      )
      VALUES (
        ${webinarId},
        ${fullName},
        ${normalizedEmail},
        ${phoneNumber},
        ${collegeOrProfession},
        ${courseInterest},
        ${experienceLevel},
        ${referralSource},
        ${questions}
      )
      ON CONFLICT ("webinar_id", "email")
      DO UPDATE SET
        "full_name" = EXCLUDED."full_name",
        "phone_number" = EXCLUDED."phone_number",
        "college_or_profession" = EXCLUDED."college_or_profession",
        "course_interest" = EXCLUDED."course_interest",
        "experience_level" = EXCLUDED."experience_level",
        "referral_source" = EXCLUDED."referral_source",
        "questions" = EXCLUDED."questions",
        "updated_at" = NOW()
      RETURNING
        "id",
        "webinar_id" AS "webinarId",
        "full_name" AS "fullName",
        "email",
        "phone_number" AS "phoneNumber",
        "college_or_profession" AS "collegeOrProfession",
        "course_interest" AS "courseInterest",
        "experience_level" AS "experienceLevel",
        "referral_source" AS "referralSource",
        "questions",
        "registered_at" AS "registeredAt",
        "updated_at" AS "updatedAt"
    `;

    return registration;
  },

  // Check if user is registered
  async isUserRegistered(userId: number, webinarId: number) {
    const registration = await prisma.webinarRegistration.findFirst({
      where: {
        userId,
        webinarId,
      },
    });
    return !!registration;
  },

  // Get user's registered webinars
  async getUserWebinars(userId: number) {
    const registrations = await prisma.webinarRegistration.findMany({
      where: { userId },
      include: {
        webinar: true,
      },
    });

    return registrations
      .map(r => r.webinar)
      .filter(w => w && w.isActive)
      .sort((a, b) => {
        const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateCompare === 0) {
          return a.time.localeCompare(b.time);
        }
        return dateCompare;
      });
  },
};

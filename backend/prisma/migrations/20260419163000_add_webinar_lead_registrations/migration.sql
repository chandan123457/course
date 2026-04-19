CREATE TABLE "webinar_lead_registrations" (
  "id" SERIAL NOT NULL,
  "webinar_id" INTEGER NOT NULL,
  "full_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone_number" TEXT NOT NULL,
  "college_or_profession" TEXT NOT NULL,
  "course_interest" TEXT NOT NULL,
  "experience_level" TEXT NOT NULL,
  "referral_source" TEXT,
  "questions" TEXT,
  "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "webinar_lead_registrations_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "webinar_lead_registrations_webinar_id_email_key"
ON "webinar_lead_registrations"("webinar_id", "email");

ALTER TABLE "webinar_lead_registrations"
ADD CONSTRAINT "webinar_lead_registrations_webinar_id_fkey"
FOREIGN KEY ("webinar_id") REFERENCES "webinars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

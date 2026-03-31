import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

// Initialize Prisma Client with proper configuration
const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Connect to database
export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    logger.info('✓ Prisma connected successfully');
  } catch (error) {
    logger.error('✗ Prisma connection failed:', error);
    throw error;
  }
};

// Disconnect from database
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

export default prisma;
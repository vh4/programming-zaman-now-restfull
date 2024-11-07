import { PrismaClient } from "@prisma/client";
import logger from "../helpers/logger";

export const prismaClient = new PrismaClient({
    log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
    ]
});

export async function initDB(): Promise<void> {
  try {
      await prismaClient.$connect();
      logger.info('Prisma client connected successfully');
  } catch (error) {
      logger.error('Error connecting Prisma client:', error);
  }
}

prismaClient.$on('error', (e) => {
    logger.error(e);
});

prismaClient.$on('warn', (e) => {
    logger.warn(e);
});

prismaClient.$on('info', (e) => {
    logger.info(e);
});

prismaClient.$on('query', (e) => {
    logger.info(e);
});
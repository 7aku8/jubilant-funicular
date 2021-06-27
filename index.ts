// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

import logger from './src/logger';

logger.info({ message: 'info' });
logger.warn({ message: 'witam' });
logger.error({ message: 'witam' });


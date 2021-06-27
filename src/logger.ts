import { Message } from './interfaces/Message';

const winston = require('winston');
import { Logger } from 'winston';

class LoggerWinston {
  public static instance: LoggerWinston;
  private logger: Logger;

  constructor() {
     this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  public static getInstance() {
    if (LoggerWinston.instance) {
      return LoggerWinston.instance;
    }
    LoggerWinston.instance = new LoggerWinston();
    return LoggerWinston.instance;
  }

  public log(data: Message) {
    const { message } = data;

    return this.logger.log(message, new Date());
  }

  public warn(data: Message) {
    const { message } = data;

    return this.logger.warn(message, new Date());
  }

  public error(data: Message) {
    const { message } = data;

    return this.logger.error(message, new Date());
  }
}

export default LoggerWinston.getInstance();

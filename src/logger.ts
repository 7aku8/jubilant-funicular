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
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });

    this.logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  public static getInstance() {
    if (LoggerWinston.instance) {
      return LoggerWinston.instance;
    }
    LoggerWinston.instance = new LoggerWinston();
    return LoggerWinston.instance;
  }

  public info(data: Message) {
    const { message } = data;

    return this.logger.info(message, new Date());
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

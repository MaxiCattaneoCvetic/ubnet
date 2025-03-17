import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class UbnetLoggerService implements LoggerService {
  private readonly logger = new Logger('UBNET-LOGGER');
  private static instance: UbnetLoggerService | null = null;

  public static getInstance(): UbnetLoggerService {
    if (!UbnetLoggerService.instance) {
      UbnetLoggerService.instance = new UbnetLoggerService();
    }
    return UbnetLoggerService.instance;
  }


  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}

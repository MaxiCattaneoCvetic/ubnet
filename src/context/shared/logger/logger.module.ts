import { Global, Module } from '@nestjs/common';
import { UbnetLoggerService } from './logger.service';

@Global()
@Module({
  providers: [UbnetLoggerService],
  exports: [UbnetLoggerService],
})
export class LoggerModule { }

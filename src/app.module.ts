import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './context/user/user.module';
import { AuthModule } from './context/auth/auth.module';
import { LoggerModule } from './context/shared/logger/logger.module';
import { DatabaseModule } from './context/shared/database/database.module';
import { AdvertiserBannerModule } from './context/AdvertisingBanner/advertiser.module';


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
    AdvertiserBannerModule
  ],
  providers: [],
})
export class AppModule { }

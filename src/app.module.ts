import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './context/User/user.module';
import { LoggerModule } from './context/Shared/logger/logger.module';
import { DatabaseModule } from './context/Shared/database/database.module';
import { AdvertiserBannerModule } from './context/AdvertisingBanner/advertiser.module';
import { AuthModule } from './context/Shared/auth/auth.module';
import { ZoneModule } from './context/zones/zone.module';


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
    AdvertiserBannerModule,
    ZoneModule
  ],
  providers: [],
})
export class AppModule { }

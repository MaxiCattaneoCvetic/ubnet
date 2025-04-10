import { Module } from '@nestjs/common';
import { AdvertiserBannerRepository } from './repository/advertiserBanner.repository';
import { AdvertiserBannerService } from './service/advertiserBanner.service';
import { AdvertiserBannerController } from './controller/advertiserBanner.controller';
import { AdvertiserBannerModel } from './models/schema/advertiserBanner.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature([
            {
                name: AdvertiserBannerModel.modelName,
                schema: AdvertiserBannerModel.schema,
            },
        ]),
        AuthModule,
    ],
    controllers: [
        AdvertiserBannerController
    ],
    providers: [
        {
            provide: 'AdvertiserBannerServiceInterface',
            useClass: AdvertiserBannerService
        },
        {
            provide: 'AdvertiserBannerRepositoryInterface',
            useClass: AdvertiserBannerRepository
        },
    ],
})
export class AdvertiserBannerModule { }

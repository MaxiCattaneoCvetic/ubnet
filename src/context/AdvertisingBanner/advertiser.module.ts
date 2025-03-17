import { Module } from '@nestjs/common';
import { AdvertiserBannerRepository } from './repository/advertiserBanner.repository';
import { AdvertiserBannerService } from './service/advertiserBanner.service';
import { AdvertiserBannerController } from './controller/advertiserBanner.controller';
import { AdvertiserBannerModel } from './models/schema/advertiserBanner.schema';
import { MongooseModule } from '@nestjs/mongoose';




@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: AdvertiserBannerModel.modelName,
                schema: AdvertiserBannerModel.schema,
            },
        ]),
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

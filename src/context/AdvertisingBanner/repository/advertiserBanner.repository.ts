import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { AdvertiserBannerCreateDto } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBannerRepositoryInterface } from "./advertiserBanner.repository.interface";
import { AdvertiserBannerDocument, AdvertiserBannerModel } from "../models/schema/advertiserBanner.schema";
import { UbnetLoggerService } from "src/context/shared/logger/logger.service";
import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";

export class AdvertiserBannerRepository implements AdvertiserBannerRepositoryInterface {

    constructor(
        @InjectModel(AdvertiserBannerModel.modelName)
        private readonly advertiserBannerModel: Model<AdvertiserBannerDocument>
    ) { }
    async findById(id: string): Promise<AdvertiserBanner | null> {
        try {
            return await this.advertiserBannerModel.findById(id);
        } catch (error: any) {
            throw error;
        }
    }


    async save(advertiserBanner: AdvertiserBanner): Promise<any> {
        try {
            const advertiserBannerDocument = new this.advertiserBannerModel(advertiserBanner);
            await advertiserBannerDocument.save();
            UbnetLoggerService.getInstance().log('Advertiser banner saved Successfully');
            return advertiserBannerDocument;
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error saving advertiser banner', error);
            throw error;
        }
    }

}
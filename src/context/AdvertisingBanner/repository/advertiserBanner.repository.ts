import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { AdvertiserBannerRepositoryInterface } from "./advertiserBanner.repository.interface";
import { AdvertiserBannerDocument, AdvertiserBannerModel } from "../models/schema/advertiserBanner.schema";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";
import { AdvertiserBannerUpdateDto } from "../models/dto/advertiserbanner.create.dto";

export class AdvertiserBannerRepository implements AdvertiserBannerRepositoryInterface {

    constructor(
        @InjectModel(AdvertiserBannerModel.modelName)
        private readonly advertiserBannerModel: Model<AdvertiserBannerDocument>
    ) { }
    async deleteBannerById(id: string): Promise<any> {
        try {
            return await this.advertiserBannerModel.deleteOne({ _id: id });
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error deleting advertiser banner', error);
            throw error;
        }
    }


    async findById(id: string): Promise<AdvertiserBanner | null> {
        try {
            return await this.advertiserBannerModel.findById(id);
        } catch (error: any) {
            throw error;
        }
    }

    async findAll(): Promise<any[]> {
        try {
            return await this.advertiserBannerModel.find();
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error finding all advertiser banners', error);
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

    async updateBannners(advertiserBanner: AdvertiserBannerUpdateDto[]): Promise<any> {
        try {
            if (advertiserBanner.length > 0) {
                await this.advertiserBannerModel.deleteMany({});
                return await this.advertiserBannerModel.insertMany(advertiserBanner);
            }

            return []
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error updating advertiser banners', error);
            throw error;
        }
    }


}
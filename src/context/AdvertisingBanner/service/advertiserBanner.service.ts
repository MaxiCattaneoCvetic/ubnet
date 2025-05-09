import { BadRequestException, Inject } from "@nestjs/common";

import { AdvertiserBannerCreateDto, AdvertiserBannerUpdateDto } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBannerServiceInterface } from "./advertiserBanner.service.interface";
import { AdvertiserBannerRepositoryInterface } from "../repository/advertiserBanner.repository.interface";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";
import { createObjectWithoutUndefined } from "../function/object.factory.create";

export class AdvertiserBannerService implements AdvertiserBannerServiceInterface {

    constructor(
        @Inject('AdvertiserBannerRepositoryInterface')
        private readonly advertiserBannerRepository: AdvertiserBannerRepositoryInterface
    ) { }


    async updateBannerById(advertiserBannerUpdate: AdvertiserBannerUpdateDto): Promise<any> {
        try {
            const _id = advertiserBannerUpdate._id;
            if (!_id) throw new BadRequestException('Id is required');
            UbnetLoggerService.getInstance().log('Updating advertiser banner in service... id: ' + _id);

            const advertiserBannerDataToUpdate: any = createObjectWithoutUndefined(advertiserBannerUpdate);
            const advertiserBannerUpdted = await this.advertiserBannerRepository.updateBannerById(_id, advertiserBannerDataToUpdate);
            if (!advertiserBannerUpdted) return null;
            UbnetLoggerService.getInstance().log('Advertiser banner updated Successfully');
            return advertiserBannerUpdted;

       
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error updating advertiser banner', error);
            throw error;
        }
    }

    async create(advertiserBannerCreateDto: AdvertiserBannerCreateDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Saving advertiser banner in service...');
            const advertiserBanner = new AdvertiserBanner(
                advertiserBannerCreateDto.description,
                advertiserBannerCreateDto.imageUrl,
                true
            )
            return await this.advertiserBannerRepository.save(advertiserBanner);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error saving advertiser banner', error);
            throw error;
        }
    }


    async findById(id: string): Promise<AdvertiserBanner | null> {
        try {
            UbnetLoggerService.getInstance().log('Finding advertiser banner in service... id: ' + id);
            const advertiserBanner = await this.advertiserBannerRepository.findById(id);

            if (!advertiserBanner) return null;

            UbnetLoggerService.getInstance().log('Advertiser banner found Successfully');
            return advertiserBanner;
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error finding advertiser banner', error);
            throw error;
        }
    }

    async findAll(): Promise<AdvertiserBanner[]> {
        try {
            UbnetLoggerService.getInstance().log('Finding all advertiser banners in service...');
            const advertiserBanners = await this.advertiserBannerRepository.findAll();
            return advertiserBanners;
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error finding all advertiser banners', error);
            throw error;
        }
    }


}
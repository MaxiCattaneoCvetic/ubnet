import { BadRequestException, Inject } from "@nestjs/common";

import { AdvertiserBannerCreateDto, AdvertiserBannerUpdateDto } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBannerServiceInterface } from "./advertiserBanner.service.interface";
import { AdvertiserBannerRepositoryInterface } from "../repository/advertiserBanner.repository.interface";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";


export class AdvertiserBannerService implements AdvertiserBannerServiceInterface {

    constructor(
        @Inject('AdvertiserBannerRepositoryInterface')
        private readonly advertiserBannerRepository: AdvertiserBannerRepositoryInterface
    ) { }
    async deleteBannerById(id: string): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Deleting advertiser banner in service... id: ' + id);
            const advertiserBannerDeleted = await this.advertiserBannerRepository.deleteBannerById(id);
            if (!advertiserBannerDeleted) {
                return []
            } else {
                UbnetLoggerService.getInstance().log('Advertiser banner deleted Successfully');
                return advertiserBannerDeleted
            }

        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error deleting advertiser banner', error);
            throw error;
        }
    }


    async updateBannners(advertiserBannerUpdate: AdvertiserBannerUpdateDto[]): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Updating advertiser banners');
            const advertiserBannerUpdted = await this.advertiserBannerRepository.updateBannners(advertiserBannerUpdate);
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
            let order: number | undefined = undefined;

            if (!advertiserBannerCreateDto.order || advertiserBannerCreateDto.order < 0) order = 0;

            const advertiserBanner = new AdvertiserBanner(
                advertiserBannerCreateDto.description,
                advertiserBannerCreateDto.imageUrl,
                advertiserBannerCreateDto.mobileImageUrl,
                true,
                advertiserBannerCreateDto.order ?? order
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
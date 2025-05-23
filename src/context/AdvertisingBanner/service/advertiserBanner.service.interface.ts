import { AdvertiserBannerCreateDto, AdvertiserBannerUpdateDto } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";

export interface AdvertiserBannerServiceInterface {
    create(advertiserBannerCreateDto: AdvertiserBannerCreateDto): Promise<any>
    findById(id: string): Promise<AdvertiserBanner | null>
    findAll(): Promise<AdvertiserBanner[]>
    updateBannners(advertiserBannerCreateDto: AdvertiserBannerUpdateDto[]): Promise<any>
    deleteBannerById(id: string): Promise<any>
}
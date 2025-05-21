import { AdvertiserBannerUpdateDto } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";

export interface AdvertiserBannerRepositoryInterface {
    save(advertiserBanner: AdvertiserBanner): Promise<any>;
    findById(id: string): Promise<AdvertiserBanner | null>
    findAll(): Promise<any[]>
    updateBannners(advertiserBanner: AdvertiserBannerUpdateDto[]): Promise<any>
    deleteBannerById(id: string): Promise<any>
}
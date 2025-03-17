import { AdvertiserBannerCreateDto } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";

export interface AdvertiserBannerServiceInterface {
    create(advertiserBannerCreateDto: AdvertiserBannerCreateDto): Promise<any>
    findById(id: string): Promise<AdvertiserBanner | null>
}
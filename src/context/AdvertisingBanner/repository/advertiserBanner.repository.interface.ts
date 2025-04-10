import { AdvertiserBanner } from "../models/entity/advertiserBanner.entity";

export interface AdvertiserBannerRepositoryInterface {
    save(advertiserBanner: AdvertiserBanner): Promise<any>;
    findById(id: string): Promise<AdvertiserBanner | null>
    findAll(): Promise<AdvertiserBanner[]>
}
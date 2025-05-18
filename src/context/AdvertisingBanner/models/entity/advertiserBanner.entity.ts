export class AdvertiserBanner {
    private description: string;
    private imageUrl: string;
    private isActive: Boolean;
    private mobileImageUrl: string;
    private order: number;

    constructor(description: string, imageUrl: string, mobileImageUrl: string, isActive: Boolean, order: number) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.mobileImageUrl = mobileImageUrl;
        this.isActive = isActive;
        this.order = order
    }

}
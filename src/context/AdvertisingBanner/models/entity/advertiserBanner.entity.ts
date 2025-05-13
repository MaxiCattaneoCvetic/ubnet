export class AdvertiserBanner {
    private description: string;
    private imageUrl: string;
    private isActive: Boolean;
    private order: number;

    constructor(description: string, imageUrl: string, isActive: Boolean, order: number) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.isActive = isActive;
        this.order = order
    }

}
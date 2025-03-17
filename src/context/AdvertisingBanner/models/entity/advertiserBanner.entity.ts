export class AdvertiserBanner {
    private description: string;
    private imageUrl: string;
    private isActive: Boolean;

    constructor(description: string, imageUrl: string, isActive: Boolean) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.isActive = isActive;
    }

}
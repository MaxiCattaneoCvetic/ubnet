export class SubscriptionPlan {
    private title: string;
    private detail: string;
    private price: number;
    private isActive: boolean;
    private region: string;
    private type: string;
    private isPromotionPlan: boolean;
    private sideText?: string;
    private featuredMessage?: string


    constructor(
        title: string,
        detail: string,
        price: number,
        isActive: boolean,
        region: string,
        type: string,
        isPromotionPlan: boolean,
        sideText?: string,
        featuredMessage?: string
    ) {
        this.title = title;
        this.detail = detail;
        this.price = price;
        this.isActive = isActive;
        this.region = region;
        this.type = type;
        this.isPromotionPlan = isPromotionPlan;
        this.sideText = sideText;
        this.featuredMessage = featuredMessage

    }

    get getTitle() { return this.title; }
    get getDetail() { return this.detail; }
    get getPrice() { return this.price; }
    get getIsActive() { return this.isActive; }
    get getRegion() { return this.region; }
    get getType() { return this.type; }
    get getSideText() { return this.sideText; }
    get getIsPromotionPlan() { return this.isPromotionPlan; }
    get getfeaturedMessage() { return this.featuredMessage; }


}
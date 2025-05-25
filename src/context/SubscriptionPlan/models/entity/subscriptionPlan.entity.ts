export class SubscriptionPlan {
    private title: string;
    private detail: string[];
    private isActive: boolean;
    private planType: string;
    private sideText?: string;
    private isFeature?: boolean


    constructor(
        title: string,
        detail: string[],
        isActive: boolean,
        planType: string,
        sideText?: string,
        isFeature?: boolean
    ) {
        this.title = title;
        this.detail = detail;
        this.isActive = isActive;
        this.planType = planType;
        this.sideText = sideText;
        this.isFeature = isFeature

    }

    get getTitle() { return this.title; }
    get getDetail() { return this.detail; }
    get getIsActive() { return this.isActive; }
    get getPlanType() { return this.planType; }
    get getSideText() { return this.sideText; }
    get getIsFeature() { return this.isFeature; }


}
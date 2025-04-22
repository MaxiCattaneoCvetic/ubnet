import { SubscriptionPlan } from "./subscriptionPlan.entity";

export class InternetPlanEntity extends SubscriptionPlan {

    private isFeature: boolean;
    private uploadDownloadValues: {
        upload: string,
        download: string
    };

    constructor(subscriptionPlan: SubscriptionPlan, isFeature: boolean, uploadDownloadValues: { upload: string, download: string }) {
        super(subscriptionPlan.getTitle,
            subscriptionPlan.getDetail,
            subscriptionPlan.getPrice,
            subscriptionPlan.getIsActive,
            subscriptionPlan.getRegion,
            subscriptionPlan.getType,
            subscriptionPlan.getIsPromotionPlan,
            subscriptionPlan.getSideText);
        this.isFeature = isFeature;
        this.uploadDownloadValues = uploadDownloadValues;
    }
}
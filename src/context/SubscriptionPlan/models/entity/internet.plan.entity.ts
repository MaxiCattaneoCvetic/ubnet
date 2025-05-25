import { SubscriptionPlan } from "./subscriptionPlan.entity";

export class InternetPlanEntity extends SubscriptionPlan {


    private uploadDownloadValues: {
        upload: string,
        download: string
    };

    constructor(subscriptionPlan: SubscriptionPlan, uploadDownloadValues: { upload: string, download: string }) {
        super(subscriptionPlan.getTitle,
            subscriptionPlan.getDetail,
            subscriptionPlan.getIsActive,
            subscriptionPlan.getPlanType,
            subscriptionPlan.getIsPromotionPlan,
            subscriptionPlan.getSideText,

        );
        this.uploadDownloadValues = uploadDownloadValues;
    }
}
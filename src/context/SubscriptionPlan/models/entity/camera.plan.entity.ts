import { SubscriptionPlan } from "./subscriptionPlan.entity";

export class CameraPlanEntity extends SubscriptionPlan {
    constructor(subscriptionPlan: SubscriptionPlan) {
        super(subscriptionPlan.getTitle,
            subscriptionPlan.getDetail,
            subscriptionPlan.getPrice,
            subscriptionPlan.getIsActive,
            subscriptionPlan.getRegion,
            subscriptionPlan.getType,
            subscriptionPlan.getIsPromotionPlan,
            subscriptionPlan.getSideText);

    }
}
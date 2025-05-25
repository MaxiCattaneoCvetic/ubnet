import { SubscriptionPlan } from "./subscriptionPlan.entity";

export class SecurityPlanEntity extends SubscriptionPlan {

    private price: number

    constructor(subscriptionPlan: SubscriptionPlan, price: number) {
        super(subscriptionPlan.getTitle,
            subscriptionPlan.getDetail,
            subscriptionPlan.getIsActive,
            subscriptionPlan.getPlanType,
            subscriptionPlan.getSideText,
            subscriptionPlan.getIsFeature
        );
        this.price = price;

    }
}
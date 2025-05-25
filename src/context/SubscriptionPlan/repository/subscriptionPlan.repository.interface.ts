import { SubscriptionPlanUpdateDto } from "../models/dto/subscriptionPlanUpdate.dto";
import { SecurityPlanEntity } from "../models/entity/security.plan.entity";
import { InternetPlanEntity } from "../models/entity/internet.plan.entity";

export interface SubscriptionPlanRepositoryInterface {
    updateSubscriptionPlanById(id: string, subscriptionPlanUpdateDto: Partial<SubscriptionPlanUpdateDto>): Promise<any>
    saveInternetPlan(internetPlan: InternetPlanEntity): Promise<any>;
    saveSecurityPlan(securityPlan: SecurityPlanEntity): Promise<any>;
    findAll(): Promise<any>;
    findById(id: string): Promise<any>;
    deletePlanById(id: string): Promise<any>;
}
import { SubscriptionPlanCreateDto } from "../models/dto/subscriptionPlans.dto";
import { SubscriptionPlanUpdateDto } from "../models/dto/subscriptionPlanUpdate.dto";

export interface SubscriptionPlanServiceInterface {
    createSubscriptionPlan(subscriptionPlanDto: SubscriptionPlanCreateDto): Promise<any>
    updateSubscriptionPlanById(id: string, subscriptionPlanUpdateDto: SubscriptionPlanUpdateDto): Promise<any>
    findById(id: string): Promise<any>
    findAll(): Promise<any>
}
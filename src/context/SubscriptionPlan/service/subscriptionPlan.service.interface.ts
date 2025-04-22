import { SubscriptionPlanCreateDto } from "../models/dto/subscriptionPlans.dto";

export interface SubscriptionPlanServiceInterface {
    createSubscriptionPlan(subscriptionPlanDto: SubscriptionPlanCreateDto): Promise<any>
    findById(id: string): Promise<any>
    findAll(): Promise<any>
}
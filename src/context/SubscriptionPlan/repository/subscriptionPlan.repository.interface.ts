import { SubscriptionPlanUpdateDto } from "../models/dto/subscriptionPlanUpdate.dto";
import { CameraPlanEntity } from "../models/entity/camera.plan.entity";
import { InternetPlanEntity } from "../models/entity/internet.plan.entity";

export interface SubscriptionPlanRepositoryInterface {
    updateSubscriptionPlanById(id: string, subscriptionPlanUpdateDto: Partial<SubscriptionPlanUpdateDto>): Promise<any>
    saveInternetPlan(internetPlan: InternetPlanEntity): Promise<any>;
    saveCameraPlan(cameraPlan: CameraPlanEntity): Promise<any>;
    findAll(): Promise<any>;
    findById(id: string): Promise<any>;
}
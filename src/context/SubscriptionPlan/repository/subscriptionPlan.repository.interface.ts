import { CameraPlanEntity } from "../models/entity/camera.plan.entity";
import { InternetPlanEntity } from "../models/entity/internet.plan.entity";

export interface SubscriptionPlanRepositoryInterface {
    saveInternetPlan(internetPlan: InternetPlanEntity): Promise<any>;
    saveCameraPlan(cameraPlan: CameraPlanEntity): Promise<any>;
    findAll(): Promise<any>;
    findById(id: string): Promise<any>;
}
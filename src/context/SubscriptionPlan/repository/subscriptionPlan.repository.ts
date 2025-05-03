import { InjectModel } from "@nestjs/mongoose";
import { SubscriptionPlanRepositoryInterface } from "./subscriptionPlan.repository.interface";
import { CameraPlanEntity } from "../models/entity/camera.plan.entity";
import { InternetPlanEntity } from "../models/entity/internet.plan.entity";
import { Model } from "mongoose";
import { InternetPlanDocument, InternetPlanModel } from "../models/schema/internet.plan.schema";
import { CameraPlanDocument, CameraPlanModel } from "../models/schema/camera.plan.schema";
import { SubscriptionPlanDocument, SubscriptionPlanModel } from "../models/schema/subscriptionPlan.schema";
import { SubscriptionPlanUpdateDto } from "../models/dto/subscriptionPlanUpdate.dto";

export class SubscriptionPlanRepository implements SubscriptionPlanRepositoryInterface {

    constructor(
        @InjectModel(InternetPlanModel.modelName)
        private readonly internetPlanModel: Model<InternetPlanDocument>,

        @InjectModel(CameraPlanModel.modelName)
        private readonly cameraPlanModel: Model<CameraPlanDocument>,

        @InjectModel(SubscriptionPlanModel.modelName)
        private readonly subscriptionPlanModel: Model<SubscriptionPlanDocument>,

    ) { }



    async saveInternetPlan(internetPlan: InternetPlanEntity): Promise<any> {
        try {
            const newInternetPlan = new this.internetPlanModel(internetPlan);
            return await newInternetPlan.save();
        } catch (error: any) {
            throw error;
        }
    }
    async saveCameraPlan(cameraPlan: CameraPlanEntity): Promise<any> {
        try {
            const newCameraPlan = new this.cameraPlanModel(cameraPlan);
            return await newCameraPlan.save();
        } catch (error: any) {
            throw error;
        }
    }



    async findAll(): Promise<any[]> {
        try {
            return await this.subscriptionPlanModel.find();
        } catch (error: any) {
            throw error;
        }
    }


    async findById(id: string): Promise<any> {
        try {
            return await this.subscriptionPlanModel.findById(id);
        } catch (error: any) {
            throw error;
        }
    }




    async updateSubscriptionPlanById(id: string, subscriptionPlanUpdateDto: Partial<SubscriptionPlanUpdateDto>): Promise<any> {
        try {
            return await this.subscriptionPlanModel.updateOne({ _id: id }, subscriptionPlanUpdateDto);
        } catch (error: any) {
            throw error;
        }
    }




}
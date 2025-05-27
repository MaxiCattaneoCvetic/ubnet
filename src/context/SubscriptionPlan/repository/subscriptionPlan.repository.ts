import { InjectModel } from "@nestjs/mongoose";
import { SubscriptionPlanRepositoryInterface } from "./subscriptionPlan.repository.interface";
import { SecurityPlanEntity } from "../models/entity/security.plan.entity";
import { InternetPlanEntity } from "../models/entity/internet.plan.entity";
import { Model } from "mongoose";
import { InternetPlanDocument, InternetPlanModel } from "../models/schema/internet.plan.schema";
import { SecurityPlanDocument, SecurityPlanModel } from "../models/schema/security.plan.schema";
import { SubscriptionPlanDocument, SubscriptionPlanModel } from "../models/schema/subscriptionPlan.schema";
import { SubscriptionPlanUpdateDto } from "../models/dto/subscriptionPlanUpdate.dto";

export class SubscriptionPlanRepository implements SubscriptionPlanRepositoryInterface {

    constructor(
        @InjectModel(InternetPlanModel.modelName)
        private readonly internetPlanModel: Model<InternetPlanDocument>,

        @InjectModel(SecurityPlanModel.modelName)
        private readonly securityPlanModel: Model<SecurityPlanDocument>,

        @InjectModel(SubscriptionPlanModel.modelName)
        private readonly subscriptionPlanModel: Model<SubscriptionPlanDocument>,

    ) { }
    async deletePlanById(id: string): Promise<any> {
        try {
            const result = await this.subscriptionPlanModel.deleteOne({ _id: id });
            return result.deletedCount > 0;
        } catch (error: any) {
            throw error;
        }
    }



    async saveInternetPlan(internetPlan: InternetPlanEntity): Promise<any> {
        try {
            const newInternetPlan = new this.internetPlanModel(internetPlan);
            return await newInternetPlan.save();
        } catch (error: any) {
            throw error;
        }
    }
    async saveSecurityPlan(securityPlan: SecurityPlanEntity): Promise<any> {
        try {
            const newSecurityPlan = new this.securityPlanModel(securityPlan);
            return await newSecurityPlan.save();
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
            return await this.subscriptionPlanModel.findByIdAndUpdate(id, subscriptionPlanUpdateDto, { new: true });
        } catch (error: any) {
            throw error;
        }
    }




}
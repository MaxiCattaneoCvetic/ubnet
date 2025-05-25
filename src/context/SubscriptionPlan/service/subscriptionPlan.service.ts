import { BadRequestException, Inject } from "@nestjs/common";


import { SubscriptionPlanCreateDto } from "../models/dto/subscriptionPlans.dto";
import { SubscriptionPlanRepositoryInterface } from "../repository/subscriptionPlan.repository.interface";
import { SubscriptionPlanServiceInterface } from "./subscriptionPlan.service.interface";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { SecurityPlanEntity } from "../models/entity/security.plan.entity";
import { InternetPlanEntity } from "../models/entity/internet.plan.entity";
import { SubscriptionPlan } from "../models/entity/subscriptionPlan.entity";
import { PlanType } from "../models/entity/enums/planType.enum";
import { SubscriptionPlanUpdateDto } from "../models/dto/subscriptionPlanUpdate.dto";
import { createObjectWithoutUndefined } from "src/context/AdvertisingBanner/function/object.factory.create";

export class SubscriptionPlanService implements SubscriptionPlanServiceInterface {

    constructor(
        @Inject('SubscriptionPlanRepositoryInterface')
        private readonly subscriptionPlanRepository: SubscriptionPlanRepositoryInterface,

    ) { }
    async deletePlanById(id: string): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Deleting plan: ' + id);
            const planDeleted = await this.subscriptionPlanRepository.deletePlanById(id);
            if (!planDeleted) return new BadRequestException("Plan not found")
            UbnetLoggerService.getInstance().log('Plan deleted Successfully');
            return { message: "Plan deleted Successfully" }
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error deleting plan: ' + error.message);
            throw error;
        }
    }


    async createSubscriptionPlan(subscriptionPlanDto: SubscriptionPlanCreateDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Creating new plan: ' + subscriptionPlanDto.title);
            if (!subscriptionPlanDto.planType) {
                UbnetLoggerService.getInstance().error("Plan planType is required");
                throw new BadRequestException("Plan planType is required");
            }

            if (subscriptionPlanDto.planType === PlanType.FIBER || subscriptionPlanDto.planType === PlanType.FIVEG) {
                const internetPlan = this.makeInternetSubscription(subscriptionPlanDto);
                const interetPlanCreated = await this.subscriptionPlanRepository.saveInternetPlan(internetPlan);
                UbnetLoggerService.getInstance().log(subscriptionPlanDto.planType + ' plan saved Successfully');
                return interetPlanCreated;

            } else if (subscriptionPlanDto.planType === PlanType.SECURITY) {
                const securityPlan = this.makeSecuritySubscription(subscriptionPlanDto);
                const securityPlanCreated = await this.subscriptionPlanRepository.saveSecurityPlan(securityPlan);
                UbnetLoggerService.getInstance().log(PlanType.SECURITY + ' plan saved Successfully');
                return securityPlanCreated;
            }


            UbnetLoggerService.getInstance().error("Plan planType is invalid");
            throw new BadRequestException("Plan planType is invalid");

        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating plan: ' + error.message);
            throw error;
        }
    }



    private makeInternetSubscription(subscriptionPlanDto: SubscriptionPlanCreateDto): InternetPlanEntity {
        const basePlanSubscription = this.makeBasePlan(subscriptionPlanDto);

        if (!subscriptionPlanDto.uploadDownloadValues) {
            throw new BadRequestException("uploadDownloadValues  is required for internet plan");
        }
        return new InternetPlanEntity(basePlanSubscription, subscriptionPlanDto.uploadDownloadValues!);
    }

    private makeSecuritySubscription(subscriptionPlanDto: SubscriptionPlanCreateDto): SecurityPlanEntity {
        const basePlanSubscription = this.makeBasePlan(subscriptionPlanDto);
        if (!subscriptionPlanDto.price) throw new BadRequestException("Price is required");
        return new SecurityPlanEntity(basePlanSubscription, subscriptionPlanDto.price);
    }


    private makeBasePlan(subscriptionPlanDto: SubscriptionPlanCreateDto): SubscriptionPlan {
        return new SubscriptionPlan(
            subscriptionPlanDto.title,
            subscriptionPlanDto.detail,
            subscriptionPlanDto.isActive,
            subscriptionPlanDto.planType,
            subscriptionPlanDto.isPromotionPlan ?? false,
            subscriptionPlanDto.sideText,
            subscriptionPlanDto.isFeature
        );
    }


    async findById(id: string): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Finding plan: ' + id);
            return await this.subscriptionPlanRepository.findById(id);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error finding plan: ' + error.message);
            throw error;

        }
    }


    async findAll(): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Finding all plans');
            return await this.subscriptionPlanRepository.findAll();
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error finding all plans: ' + error.message);
            throw error;
        }
    }


    async updateSubscriptionPlanById(id: string, subscriptionPlanUpdateDto: SubscriptionPlanUpdateDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Updating plan: ' + id);
            const objetToUpdate = createObjectWithoutUndefined(subscriptionPlanUpdateDto);
            return await this.subscriptionPlanRepository.updateSubscriptionPlanById(id, objetToUpdate);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error updating plan: ' + error.message);
            throw error;
        }
    }






}
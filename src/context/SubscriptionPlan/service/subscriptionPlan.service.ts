import { BadRequestException, Inject } from "@nestjs/common";


import { SubscriptionPlanCreateDto } from "../models/dto/subscriptionPlans.dto";
import { SubscriptionPlanRepositoryInterface } from "../repository/subscriptionPlan.repository.interface";
import { SubscriptionPlanServiceInterface } from "./subscriptionPlan.service.interface";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { CameraPlanEntity } from "../models/entity/camera.plan.entity";
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


    async createSubscriptionPlan(subscriptionPlanDto: SubscriptionPlanCreateDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Creating new plan: ' + subscriptionPlanDto.title);
            if (!subscriptionPlanDto.type) {
                UbnetLoggerService.getInstance().error("Plan type is required");
                throw new BadRequestException("Plan type is required");
            }

            if (subscriptionPlanDto.type === PlanType.FIBER || subscriptionPlanDto.type === PlanType.FIVEG) {
                const internetPlan = this.makeInternetSubscription(subscriptionPlanDto);
                const interetPlanCreated = await this.subscriptionPlanRepository.saveInternetPlan(internetPlan);
                UbnetLoggerService.getInstance().log(subscriptionPlanDto.type + ' plan saved Successfully');
                return interetPlanCreated;

            } else if (subscriptionPlanDto.type === PlanType.CAMERA) {
                const cameraPlan = this.makeCameraSubscription(subscriptionPlanDto);
                const cameraPlanCreated = await this.subscriptionPlanRepository.saveCameraPlan(cameraPlan);
                UbnetLoggerService.getInstance().log(PlanType.CAMERA + ' plan saved Successfully');
                return cameraPlanCreated;
            }


            UbnetLoggerService.getInstance().error("Plan type is invalid");
            throw new BadRequestException("Plan type is invalid");

        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating plan: ' + error.message);
            throw error;
        }
    }



    private makeInternetSubscription(subscriptionPlanDto: SubscriptionPlanCreateDto): InternetPlanEntity {
        const basePlanSubscription = this.makeBasePlan(subscriptionPlanDto);

        if (!subscriptionPlanDto.uploadDownloadValues || subscriptionPlanDto.isFeature) {
            throw new BadRequestException("uploadDownloadValues and isFeature is required for internet plan");
        }
        return new InternetPlanEntity(basePlanSubscription, subscriptionPlanDto.isFeature, subscriptionPlanDto.uploadDownloadValues!);
    }

    private makeCameraSubscription(subscriptionPlanDto: SubscriptionPlanCreateDto): CameraPlanEntity {
        const basePlanSubscription = this.makeBasePlan(subscriptionPlanDto);
        return new CameraPlanEntity(basePlanSubscription);
    }


    private makeBasePlan(subscriptionPlanDto: SubscriptionPlanCreateDto): SubscriptionPlan {
        return new SubscriptionPlan(
            subscriptionPlanDto.title,
            subscriptionPlanDto.detail,
            subscriptionPlanDto.price,
            subscriptionPlanDto.isActive,
            subscriptionPlanDto.region,
            subscriptionPlanDto.type,
            subscriptionPlanDto.isPromotionPlan,
            subscriptionPlanDto.sideText
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
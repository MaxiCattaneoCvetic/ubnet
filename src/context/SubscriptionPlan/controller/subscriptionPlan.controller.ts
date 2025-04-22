import { Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from "@nestjs/common";
import { SubscriptionPlanServiceInterface } from "../service/subscriptionPlan.service.interface";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { SubscriptionPlanCreateDto } from "../models/dto/subscriptionPlans.dto";

@Controller('plans')
export class SubscriptionPlanController {

    constructor(
        @Inject('SubscriptionPlanServiceInterface')
        private readonly subscriptionPlanService: SubscriptionPlanServiceInterface
    ) {

    }



    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiBody({ type: SubscriptionPlanCreateDto })
    @ApiResponse({ status: 201, description: 'Plan created', type: SubscriptionPlanCreateDto })
    @ApiResponse({ status: 404, description: 'Plan has not been created, check your payload' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async createSubscriptionPlan(subscriptionPlanDto: SubscriptionPlanCreateDto): Promise<any> {
        try {
            return this.subscriptionPlanService.createSubscriptionPlan(subscriptionPlanDto);
        } catch (error: any) {
            throw error;
        }
    }


    // TODO : DOCUMENTATION FINNDS
    @Get(":id")
    async findSubscriptionPlanById(id: string): Promise<any> {
        try {
            return this.subscriptionPlanService.findById(id);
        } catch (error: any) {
            throw error;
        }
    }



    @Get()
    async findAllSubscriptionPlans(): Promise<any> {
        try {
            return this.subscriptionPlanService.findAll();
        } catch (error: any) {
            throw error;
        }
    }



}  
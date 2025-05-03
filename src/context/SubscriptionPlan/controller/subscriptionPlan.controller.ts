import { Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from "@nestjs/common";
import { SubscriptionPlanServiceInterface } from "../service/subscriptionPlan.service.interface";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { SubscriptionPlanCreateDto, SubscriptionPlanResponseDto } from "../models/dto/subscriptionPlans.dto";

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



    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 201, description: 'Subscription Plan found', type: SubscriptionPlanResponseDto })
    @ApiResponse({ status: 404, description: 'Subscription Plan not found'})
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async findSubscriptionPlanById(id: string): Promise<any> {
        try {
            return this.subscriptionPlanService.findById(id);
        } catch (error: any) {
            throw error;
        }
    }



    @Get()
    @ApiResponse({ status: 201, description: 'Subscriptions Plan found', type: [SubscriptionPlanResponseDto] })
    @ApiResponse({ status: 404, description: 'Subscriptions Plan not found'})
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async findAllSubscriptionPlans(): Promise<any> {
        try {
            return this.subscriptionPlanService.findAll();
        } catch (error: any) {
            throw error;
        }
    }



}  
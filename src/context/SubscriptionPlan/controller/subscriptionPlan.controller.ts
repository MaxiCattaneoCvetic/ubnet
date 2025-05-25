import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { SubscriptionPlanServiceInterface } from "../service/subscriptionPlan.service.interface";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { SubscriptionPlanCreateDto, SubscriptionPlanResponseDto } from "../models/dto/subscriptionPlans.dto";
import { SubscriptionPlanUpdateDto } from "../models/dto/subscriptionPlanUpdate.dto";

@Controller('plan')
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
    @ApiResponse({ status: 400, description: 'Plan has not been created, check your payload' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async createSubscriptionPlan(@Body() subscriptionPlanDto: SubscriptionPlanCreateDto): Promise<any> {
        try {
            return this.subscriptionPlanService.createSubscriptionPlan(subscriptionPlanDto);
        } catch (error: any) {
            throw error;
        }
    }

    @Put(":id")
    @ApiResponse({ status: 201, description: 'Subscriptions Plan successfully updated', type: [SubscriptionPlanResponseDto] })
    @ApiResponse({ status: 404, description: 'Subscriptions Plan not found' })
    @ApiResponse({ status: 400, description: 'Bad request, request body is invalid' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    @ApiBody({ type: SubscriptionPlanUpdateDto })
    async updateSubscriptionPlanById(@Param('id') id: string, @Body() subscriptionPlanUpdateDto: SubscriptionPlanUpdateDto): Promise<any> {
        try {
            return this.subscriptionPlanService.updateSubscriptionPlanById(id, subscriptionPlanUpdateDto);
        } catch (error: any) {
            throw error;
        }
    }



    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Subscription Plan found', type: SubscriptionPlanResponseDto })
    @ApiResponse({ status: 404, description: 'Subscription Plan not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async findSubscriptionPlanById(@Param('id') id: string): Promise<any> {
        try {
            return this.subscriptionPlanService.findById(id);
        } catch (error: any) {
            throw error;
        }
    }



    @Get()
    @ApiResponse({ status: 200, description: 'Subscriptions Plan found', type: [SubscriptionPlanResponseDto] })
    @ApiResponse({ status: 404, description: 'Subscriptions Plan not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async findAllSubscriptionPlans(): Promise<any> {
        try {
            return await this.subscriptionPlanService.findAll();
        } catch (error: any) {
            throw error;
        }
    }


    @Delete(":id")
    @ApiResponse({ status: 200, description: 'Subscriptions Plan successfully deleted' })
    @ApiResponse({ status: 404, description: 'Subscriptions Plan not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async deletePlanById(@Param('id') id: string): Promise<any> {
        try {
            return this.subscriptionPlanService.deletePlanById(id);
        } catch (error: any) {
            throw error;
        }
    }

}  
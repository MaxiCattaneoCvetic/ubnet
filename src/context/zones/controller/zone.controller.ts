import { Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";


import { ZoneServiceInterface } from "../service/zone.service.interface";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";
import { ZoneCreateDto, ZoneReponseDto, ZoneResponseWithPlansDto } from "../models/dto/zone.create.dto";


@Controller('zone')
export class ZoneController {


    constructor(
        @Inject('ZoneServiceInterface')
        private readonly zoneService: ZoneServiceInterface
    ) { }



    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiBody({ type: ZoneCreateDto })
    @ApiResponse({ status: 201, description: 'Zone has been created', type: ZoneReponseDto })
    @ApiResponse({ status: 400, description: 'Plan has not been created, check your payload' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async createSubscriptionPlan(zone: ZoneCreateDto): Promise<any> {
        try {
            return await this.zoneService.createZone(zone);
        } catch (error: any) {
            throw error;
        }
    }


    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Zones found', type: ZoneResponseWithPlansDto })
    @ApiResponse({ status: 404, description: 'Zones not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async getZonesWhithPlans(): Promise<any> {
        try {
            return this.zoneService.getZonesWhithPlans();
        } catch (error: any) {
            throw error;
        }
    }


    @Get(":name")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Zones found', type: ZoneResponseWithPlansDto })
    @ApiResponse({ status: 404, description: 'Zones not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async getZonesByName(name: string): Promise<any> {
        try {
            return this.zoneService.getZonesWhithPlans();
        } catch (error: any) {
            throw error;
        }
    }







}
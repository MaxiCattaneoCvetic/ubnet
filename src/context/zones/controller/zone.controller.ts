import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";


import { ZoneServiceInterface } from "../service/zone.service.interface";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";
import { ZoneDto, ZoneReponseDto, ZoneResponseWithPlansDto } from "../models/dto/zone.create.dto";


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
    @ApiBody({ type: ZoneDto })
    @ApiResponse({ status: 201, description: 'Zone has been created', type: ZoneReponseDto })
    @ApiResponse({ status: 400, description: 'Plan has not been created, check your payload' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async createSubscriptionPlan(@Body() zone: ZoneDto): Promise<any> {
        try {
            return await this.zoneService.createZone(zone);
        } catch (error: any) {
            throw error;
        }
    }


    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Zones found', type: [ZoneResponseWithPlansDto] })
    @ApiResponse({ status: 404, description: 'Zones not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async getZonesWhithPlans(): Promise<any> {
        try {
            return this.zoneService.getZonesWhithPlans();
        } catch (error: any) {
            throw error;
        }
    }


    @Get(":label")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Zones found', type: ZoneResponseWithPlansDto })
    @ApiResponse({ status: 404, description: 'Zones not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async getZonesByName(@Param('label') label: string): Promise<any> {
        try {
            return this.zoneService.getZonesByName(label);
        } catch (error: any) {
            throw error;
        }
    }



    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: ZoneDto })
    @ApiResponse({ status: 200, description: 'Zones updated successfully', type: ZoneResponseWithPlansDto })
    @ApiResponse({ status: 404, description: 'Zones not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    async updateZoneById(@Param('id') id: string, @Body() zoneUpdateDto: ZoneDto): Promise<any> {
        try {
            return this.zoneService.updateZoneById(id, zoneUpdateDto);
        } catch (error: any) {
            throw error;
        }
    }


    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Zones deleted successfully' })
    @ApiResponse({ status: 404, description: 'Zones not found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    async deleteZoneById(@Param('id') id: string): Promise<any> {
        try {
            return this.zoneService.deleteZoneById(id);
        } catch (error: any) {
            throw error;
        }
    }







}
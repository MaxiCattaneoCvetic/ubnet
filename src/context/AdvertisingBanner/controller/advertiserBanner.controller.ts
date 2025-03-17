import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";


import { AdvertiserBannerCreateDto, AdvertiserBannerCreateDto_response } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBannerServiceInterface } from "../service/advertiserBanner.service.interface";

@Controller('banner')
export class AdvertiserBannerController {
    constructor(
        @Inject('AdvertiserBannerServiceInterface')
        private readonly advertiserBannerService: AdvertiserBannerServiceInterface
    ) { }


    @HttpCode(HttpStatus.CREATED)
    @Post()
    @ApiBody({ type: AdvertiserBannerCreateDto })
    @ApiResponse({ status: 201, description: 'Banner created', type: AdvertiserBannerCreateDto_response })
    @ApiResponse({ status: 404, description: 'Bad request, check your payload' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async create(@Body() advertiserBannerCreateDto: AdvertiserBannerCreateDto) {
        try {
            return await this.advertiserBannerService.create(advertiserBannerCreateDto);
        } catch (error: any) {
            throw error;
        }
    }


    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @ApiParam({ name: 'id', type: String, description: 'ID del banner publicitario' })
    @ApiResponse({ status: 200, description: 'Banner encontrado', type: AdvertiserBannerCreateDto_response })
    @ApiResponse({ status: 404, description: 'Banner no encontrado' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async findById(@Param('id') id: string) {
        try {
            const advertiserBanner = await this.advertiserBannerService.findById(id);
            if (!advertiserBanner) return HttpStatus.NOT_FOUND;
            return advertiserBanner;
        } catch (error: any) {
            throw error;
        }
    }


}

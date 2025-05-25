import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, UseGuards, NotFoundException, Put, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";

import { AdvertiserBannerCreateDto, AdvertiserBannerCreateDto_response, AdvertiserBannerUpdateDto } from "../models/dto/advertiserbanner.create.dto";
import { AdvertiserBannerServiceInterface } from "../service/advertiserBanner.service.interface";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";


@Controller('banner')
export class AdvertiserBannerController {
    constructor(
        @Inject('AdvertiserBannerServiceInterface')
        private readonly advertiserBannerService: AdvertiserBannerServiceInterface
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
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
    @Get('all')
    @ApiResponse({ status: 200, description: 'Banners encontrados', type: [AdvertiserBannerCreateDto_response] })
    @ApiResponse({ status: 404, description: 'Banners no encontrados' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async findAll() {
        try {
            const advertiserBanners = await this.advertiserBannerService.findAll();

            return advertiserBanners?? []
        } catch (error: any) {
            throw error;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiParam({ name: 'id', type: String, description: 'ID del banner publicitario' })
    @ApiResponse({ status: 200, description: 'Banner encontrado', type: AdvertiserBannerCreateDto_response })
    @ApiResponse({ status: 404, description: 'Banner no encontrado' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async findById(@Param('id') id: string) {
        try {
            const advertiserBanner = await this.advertiserBannerService.findById(id);
            if (!advertiserBanner) {
                throw new NotFoundException(`Banner with ID ${id} not found`);
            }
            return advertiserBanner;
        } catch (error: any) {
            throw error;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Put()
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiBody({ type: [AdvertiserBannerUpdateDto], description: 'Nuevo Banner' })
    @ApiResponse({ status: 200, description: 'Banner editado correctaente', type: [AdvertiserBannerCreateDto_response] })
    @ApiResponse({ status: 404, description: 'Banner no encontrado' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async updateBannners(@Body() advertiserBannerUpdateDto: [AdvertiserBannerUpdateDto]) {
        try {
            const advertiserBanner = await this.advertiserBannerService.updateBannners(advertiserBannerUpdateDto);
            return advertiserBanner;
        } catch (error: any) {
            throw error;
        }
    }


    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({ status: 200, description: 'Banner eliminado correctaente' })
    @ApiResponse({ status: 404, description: 'Banner no encontrado' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async deleteBannerById(@Param('id') id: string) {
        try {
            return await this.advertiserBannerService.deleteBannerById(id);

        } catch (error: any) {
            throw error;
        }
    }

}

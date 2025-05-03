import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";
import { ServiceCoverageAreasCreateDto, ServiceCoverageAreasResponseDto } from "../models/dto/serviceCoverageAreas.dto";
import { ServiceCoverageAreaInterface } from "../service/serviceCoverageArea.service.interface";



@Controller('coverage-areas')
export class ServiceCoverageAreasController {

    constructor(
        @Inject('ServiceCoverageAreasServiceInterface')
        private readonly serviceCoverageAreaService: ServiceCoverageAreaInterface
    ) { }



    /*
    TODO:
    -CHECK ATTRIBUTES OF SERVICE COVERAGE AREAS ---> Complete entity, dts, and create schemas.
    
    
    */

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiBody({ type: ServiceCoverageAreasCreateDto })
    @ApiResponse({ status: 201, description: 'Service coverage area has been created', type: ServiceCoverageAreasResponseDto })
    @ApiResponse({ status: 400, description: 'Service coverage area not created, check your payload' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async createServiceCoverageArea(@Body() serviceCoverageAreasCreateDto: ServiceCoverageAreasCreateDto) {
        try {
            return await this.serviceCoverageAreaService.createServiceCoverageArea(serviceCoverageAreasCreateDto);
        } catch (error: any) {
            throw error;
        }
    }


}
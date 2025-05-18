import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, getSchemaPath } from "@nestjs/swagger";

import { ShapeDataServiceInterface } from "../service/shapeData.service.interface";
import { AuthGuard } from "src/context/Shared/auth/guard/auth.guard";
import { ShapeDataCircleCreateDto, ShapeDataPolygonCreateDto } from "../models/dto/shapeData.create.dto";
import { ShapeDataType } from "../models/enum/shapeData.type.enum";
import { ShapeDataResponseDto } from "../models/dto/shapeData.response.dto";

@Controller('shapeData')
export class ShapeDataController {

    constructor(
        @Inject('ShapeDataServiceInterface')
        private readonly shapeDataService: ShapeDataServiceInterface
    ) {

    }



    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiBody({
        description: 'Shape data (Circle or Polygon)',
        required: true,
        schema: {
            discriminator: {
                propertyName: 'type',
                mapping: {
                    [ShapeDataType.CIRCLE]: getSchemaPath(ShapeDataCircleCreateDto),
                    [ShapeDataType.POLYGON]: getSchemaPath(ShapeDataPolygonCreateDto),
                },
            },
            oneOf: [
                { $ref: getSchemaPath(ShapeDataCircleCreateDto) },
                { $ref: getSchemaPath(ShapeDataPolygonCreateDto) },
            ],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Zone Coverage Shape has been created',
        type: ShapeDataResponseDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createZoneCoverageShapes(
        @Body() shapeDataCreateDto: (ShapeDataCircleCreateDto | ShapeDataPolygonCreateDto)[]
    ): Promise<ShapeDataResponseDto> {
        return this.shapeDataService.createZoneCoverageShapes(shapeDataCreateDto);
    }



    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 201,
        description: 'All Zone Coverage ',
        type: [ShapeDataResponseDto]
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getAllCoverageShapes(
    ): Promise<ShapeDataResponseDto> {
        return this.shapeDataService.getAllCoverageShapes();
    }



}
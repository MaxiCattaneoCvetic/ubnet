import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { ShapeDataCircleCreateDto, ShapeDataPolygonCreateDto } from "../models/dto/shapeData.create.dto";
import { ShapeDataType } from "../models/enum/shapeData.type.enum";
import { ShapeDataServiceInterface } from "./shapeData.service.interface";
import { ShapeData } from "../models/entity/shapeData.entity";
import { BadRequestException, Inject } from "@nestjs/common";
import { ShapeDataRepositoryInterface } from "../repository/shapeData.respository.interface";

export class ShapeDataService implements ShapeDataServiceInterface {

    constructor(
        @Inject("ShapeDataRepositoryInterface")
        private readonly shapeDataRepository: ShapeDataRepositoryInterface
    ) { }

    async createZoneCoverageShapes(shapeDataCreateDto: ShapeDataCircleCreateDto | ShapeDataPolygonCreateDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log("Creating zone coverage shapes type: " + shapeDataCreateDto.type);
            if (shapeDataCreateDto.type === ShapeDataType.CIRCLE) {
                return await this.createZoneCoverageShapes_CIRCLE_TYPE(shapeDataCreateDto as ShapeDataCircleCreateDto);
            } else if (shapeDataCreateDto.type === ShapeDataType.POLYGON) {
                return await this.createZoneCoverageShapes_POLYGON_TYPE(shapeDataCreateDto as ShapeDataPolygonCreateDto);
            } else {
                throw new BadRequestException("Error creating zone coverage shapes type not supported");
            }
        } catch (error: any) {
            throw error;
        }
    }



    private async createZoneCoverageShapes_CIRCLE_TYPE(shapeDataCreateDto: ShapeDataCircleCreateDto): Promise<any> {
        try {
            const circleData = {
                center: {
                    lat: shapeDataCreateDto.center.lat,
                    lng: shapeDataCreateDto.center.lng
                },
                radius: shapeDataCreateDto.radius
            }
            const shapeCircleData = new ShapeData(
                shapeDataCreateDto.type,
                shapeDataCreateDto.clientId,
                circleData
            )
            return await this.shapeDataRepository.save(shapeCircleData);

        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating zone coverage shapes type: ' + shapeDataCreateDto.type, error);
            throw error;
        }
    }
    private async createZoneCoverageShapes_POLYGON_TYPE(shapeDataCreateDto: ShapeDataPolygonCreateDto): Promise<any> {
        try {
            const polygonData = {
                polygon: {
                    path: shapeDataCreateDto.path
                }
            }
            const shapePolygonData = new ShapeData(
                shapeDataCreateDto.type,
                shapeDataCreateDto.clientId,
                undefined,
                polygonData.polygon
            )
            return await this.shapeDataRepository.save(shapePolygonData);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating zone coverage shapes type: ' + shapeDataCreateDto.type, error);
            throw error;
        }
    }





    async getAllCoverageShapes(): Promise<any> {
        try {
            return await this.shapeDataRepository.findAll();
        } catch (error: any) {
            throw error;
        }

    }

}
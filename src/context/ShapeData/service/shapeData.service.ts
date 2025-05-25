import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { ShapeDataCircleCreateDto, ShapeDataCircleUpdateDto, ShapeDataPolygonCreateDto, ShapeDataPolygonUpdateDto } from "../models/dto/shapeData.create.dto";
import { ShapeDataType } from "../models/enum/shapeData.type.enum";
import { ShapeDataServiceInterface } from "./shapeData.service.interface";
import { ShapeData } from "../models/entity/shapeData.entity";
import { BadRequestException, Inject } from "@nestjs/common";
import { ShapeDataRepositoryInterface } from "../repository/shapeData.respository.interface";
import { forEach } from "lodash";

export class ShapeDataService implements ShapeDataServiceInterface {

    constructor(
        @Inject("ShapeDataRepositoryInterface")
        private readonly shapeDataRepository: ShapeDataRepositoryInterface
    ) { }


    async createZoneCoverageShapes(shapeDataCreateDto: (ShapeDataCircleCreateDto | ShapeDataPolygonCreateDto)[]): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log("Creating zones coverage shapes:");
            const { arrayCircleZones, arrayPolygonZones } = this.qualifyZonesOfCoverage(shapeDataCreateDto)

            if (arrayCircleZones && arrayCircleZones.length > 0) {

                forEach(arrayCircleZones, async (circleZone: any) => {
                    if (circleZone._id) {
                        await this.updateZoneCoverageShapes_CIRCLE_TYPE(circleZone);
                    } else {
                        await this.createZoneCoverageShapes_CIRCLE_TYPE(circleZone);
                    }
                });
            }

            if (arrayPolygonZones && arrayPolygonZones.length > 0) {
                forEach(arrayPolygonZones, async (polygonZones: any) => {
                    if (polygonZones._id) {
                        await this.updateZoneCoverageShapes_POLYGON_TYPE(polygonZones);
                    } else {
                        await this.createZoneCoverageShapes_POLYGON_TYPE(polygonZones);
                    }
                });
            }

        } catch (error: any) {
            throw error;
        }
    }


    private qualifyZonesOfCoverage(shapeDataCreateDto: (ShapeDataCircleCreateDto | ShapeDataPolygonCreateDto)[]): { arrayCircleZones: ShapeDataCircleCreateDto[] | [], arrayPolygonZones: ShapeDataPolygonCreateDto[] | [] } {
        let arrayCircleZones: ShapeDataCircleCreateDto[] = [];
        let arrayPolygonZones: ShapeDataPolygonCreateDto[] = [];

        shapeDataCreateDto.forEach(element => {
            if (element.type === ShapeDataType.CIRCLE) {
                arrayCircleZones.push(element as ShapeDataCircleCreateDto);
            } else {
                arrayPolygonZones.push(element as ShapeDataPolygonCreateDto);
            }
        });
        return { arrayCircleZones, arrayPolygonZones };
    }




    private async createZoneCoverageShapes_CIRCLE_TYPE(shapeDataCreateDto: ShapeDataCircleCreateDto): Promise<any> {
        try {
            const circleData = {
                center: {
                    lat: shapeDataCreateDto.circle.center.lat,
                    lng: shapeDataCreateDto.circle.center.lng
                },
                radius: shapeDataCreateDto.circle.radius
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
                    path: shapeDataCreateDto.polygon.path
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

    async deleteCoverageShapesByIds(ids: string[]): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Deleting zone coverage shapes');
            if (!ids || ids.length === 0) {
                UbnetLoggerService.getInstance().warn('No ids to delete');
                return { message: "No ids to delete" }
            }
            await this.shapeDataRepository.deleteCoverageShapesByIds(ids);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error deleting zone coverage shapes: ' + error);
            throw error;

        }
    }


    private async updateZoneCoverageShapes_CIRCLE_TYPE(shapeDataCircleUpdateDto: ShapeDataCircleUpdateDto): Promise<any> {
        try {
            if (!shapeDataCircleUpdateDto._id) {
                throw new BadRequestException("_id is required for updates");
            }

            const circleData = {
                center: {
                    lat: shapeDataCircleUpdateDto.circle.center.lat,
                    lng: shapeDataCircleUpdateDto.circle.center.lng
                },
                radius: shapeDataCircleUpdateDto.circle.radius
            }
            const shapeCircleData = new ShapeData(
                shapeDataCircleUpdateDto.type,
                shapeDataCircleUpdateDto.clientId,
                circleData,
                undefined,
                shapeDataCircleUpdateDto._id
            )
            return await this.shapeDataRepository.update(shapeCircleData);

        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error updating zone coverage shapes type: ' + shapeDataCircleUpdateDto.type, error);
            throw error;
        }
    }

    private async updateZoneCoverageShapes_POLYGON_TYPE(shapeDataUpdateDto: ShapeDataPolygonUpdateDto): Promise<any> {
        try {
            if (!shapeDataUpdateDto._id) {
                throw new BadRequestException("_id is required for updates");
            }
            const polygonData = {
                polygon: {
                    path: shapeDataUpdateDto.polygon.path
                }
            }
            const shapePolygonData = new ShapeData(
                shapeDataUpdateDto.type,
                shapeDataUpdateDto.clientId,
                undefined,
                polygonData.polygon,
                shapeDataUpdateDto._id
            )
            return await this.shapeDataRepository.update(shapePolygonData);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating zone coverage shapes type: ' + shapeDataUpdateDto.type, error);
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
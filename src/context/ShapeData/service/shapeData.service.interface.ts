import { ShapeDataCircleCreateDto, ShapeDataPolygonCreateDto } from "../models/dto/shapeData.create.dto";

export interface ShapeDataServiceInterface {
    createZoneCoverageShapes(shapeDataCreateDto: (ShapeDataCircleCreateDto | ShapeDataPolygonCreateDto)[]): Promise<any>;
    deleteCoverageShapesByIds(ids: string[]): Promise<any>;
    getAllCoverageShapes(): Promise<any>;
}
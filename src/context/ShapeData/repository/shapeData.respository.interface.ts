import { ShapeData } from "../models/entity/shapeData.entity";

export interface ShapeDataRepositoryInterface {
    save(shapeData: ShapeData): Promise<any>;
    update(shapeData: ShapeData): Promise<any>;
    findAll(): Promise<any>;
    deleteCoverageShapesByIds(ids: string[]): Promise<any>;
}
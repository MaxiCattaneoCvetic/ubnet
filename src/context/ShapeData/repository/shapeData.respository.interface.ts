import { ShapeData } from "../models/entity/shapeData.entity";

export interface ShapeDataRepositoryInterface {
    save(shapeData: ShapeData): Promise<any>;
    findAll(): Promise<any>;
}
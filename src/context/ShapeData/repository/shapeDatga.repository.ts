import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ShapeData } from "../models/entity/shapeData.entity";
import { ShapeDataRepositoryInterface } from "./shapeData.respository.interface";
import { ShapeDataDocument, ShapeDataModel } from "../models/schema/shapeData.schema";


export class ShapeDataRepository implements ShapeDataRepositoryInterface {

    constructor(
        @InjectModel(ShapeDataModel.modelName)
        private readonly shapeDataModel: Model<ShapeDataDocument>,
    ) { }

    async update(shapeData: ShapeData): Promise<any> {
        try {
            const _id = shapeData.getId;
            const shapeDataDocument = new this.shapeDataModel(shapeData);
            await this.shapeDataModel.updateOne({ _id }, shapeDataDocument);
        } catch (error: any) {
            throw error;
        }

    }



    async save(shapeData: ShapeData): Promise<any> {
        try {
            const shapeDataDocument = new this.shapeDataModel(shapeData);
            return await shapeDataDocument.save();
        } catch (error: any) {
            throw error;
        }
    }


    async findAll(): Promise<any> {
        return await this.shapeDataModel.find().lean() ?? [];
    }

    async deleteCoverageShapesByIds(ids: string[]): Promise<any> {
        try {
            await this.shapeDataModel.deleteMany({ _id: { $in: ids } });
        } catch (error: any) {
            throw error;
        }
    }

}
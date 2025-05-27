
import { InjectModel } from "@nestjs/mongoose";

import { Zone } from "../models/entity/zone.entity";
import { ZoneRepositoryInterface } from "./zone.repository.interface";
import { ZoneDocument, ZoneModel } from "../models/schemas/zone.schema";
import { Model } from "mongoose";

export class ZoneRepository implements ZoneRepositoryInterface {

    constructor(
        @InjectModel(ZoneModel.modelName)
        private readonly zoneDocument: Model<ZoneDocument>,

    ) { }
    async deleteZoneById(id: string): Promise<any> {
        try {
            const result = await this.zoneDocument.deleteOne({ _id: id });
            return result.deletedCount > 0
        }
        catch (error: any) {
            throw error;
        }
    }


    async save(zoneCreateDto: Zone): Promise<any> {
        try {
            const zoneDocument = new this.zoneDocument(zoneCreateDto);
            return await zoneDocument.save();
        } catch (error: any) {
            throw error;
        }
    }




    async getZonesWhithPlans(): Promise<any> {
        try {
            return await this.zoneDocument
                .find()
                .populate({
                    path: 'plans',
                    match: { isActive: true }
                })
        } catch (error: any) {
            throw error;
        }
    }

    async getZonesByName(label: string): Promise<any> {
        try {
            return await this.zoneDocument
                .find({ label })
                .populate({
                    path: 'plans',
                    match: { isActive: true }
                })
        } catch (error: any) {
            throw error;
        }
    }


    async updateZoneById(id: string, zoneUpdateDto: Object): Promise<any> {
        try {
            return await this.zoneDocument
                .findByIdAndUpdate({ _id: id }, zoneUpdateDto, { new: true }).populate({
                    path: 'plans',
                    match: { isActive: true }
                });
        } catch (error: any) {
            throw error;
        }
    }



}
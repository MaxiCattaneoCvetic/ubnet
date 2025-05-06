
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


}
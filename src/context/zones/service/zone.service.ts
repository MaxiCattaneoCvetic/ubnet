import { Inject } from "@nestjs/common";


import { ZoneCreateDto } from "../models/dto/zone.create.dto";
import { ZoneServiceInterface } from "./zone.service.interface";
import { ZoneRepositoryInterface } from "../repository/zone.repository.interface";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { Zone } from "../models/entity/zone.entity";

export class ZoneService implements ZoneServiceInterface {

    constructor(
        @Inject("ZoneServiceInterface")
        private readonly zoneRepository: ZoneRepositoryInterface
    ) { }



    async createZone(zoneCreateDto: ZoneCreateDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Creating new zone: ' + zoneCreateDto.name);
            const zoneEntity = new Zone(zoneCreateDto.name, zoneCreateDto.plans);
            return await this.zoneRepository.save(zoneEntity);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating zone: ' + zoneCreateDto.name, error);
            throw error;
        }
    }


    async getZonesWhithPlans(): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log("Finding all zones with plans");
            return await this.zoneRepository.getZonesWhithPlans();
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error finding all zones with plans', error);
            throw error;
        }
    }


    async getZonesByName(): Promise<any> {
        throw new Error("Method not implemented.");
    }


}
import { Inject } from "@nestjs/common";


import { ZoneDto } from "../models/dto/zone.create.dto";
import { ZoneServiceInterface } from "./zone.service.interface";
import { ZoneRepositoryInterface } from "../repository/zone.repository.interface";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { Zone } from "../models/entity/zone.entity";
import { createObjectWithoutUndefined } from "src/context/AdvertisingBanner/function/object.factory.create";

export class ZoneService implements ZoneServiceInterface {

    constructor(
        @Inject("ZoneRepositoryInterface")
        private readonly zoneRepository: ZoneRepositoryInterface
    ) { }



    async createZone(zoneCreateDto: ZoneDto): Promise<any> {
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


    async getZonesByName(name: string): Promise<any> {
        try {
            if (!name) return null;
            UbnetLoggerService.getInstance().log("Finding all zones by name" + name);
            return await this.zoneRepository.getZonesByName(name);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error("Error finding all zones by name" + name, error);
            throw error;
        }
    }

    async updateZoneById(id: string, zoneUpdateDto: ZoneDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Updating zone: ' + id);
            const objetToUpdate = createObjectWithoutUndefined(zoneUpdateDto);
            return await this.zoneRepository.updateZoneById(id, objetToUpdate);
        } catch (error: any) {
            throw error;
        }
    }



}
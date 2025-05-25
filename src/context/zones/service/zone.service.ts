import { BadRequestException, Inject } from "@nestjs/common";


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
    async deleteZoneById(id: string): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Deleting zone: ' + id);
            const zoneDeleted = await this.zoneRepository.deleteZoneById(id);
            if (!zoneDeleted) return new BadRequestException("Zone not found")
            UbnetLoggerService.getInstance().log('Zone deleted Successfully');
            return { message: "Zone deleted Successfully" }

        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error deleting zone: ' + id, error);
            throw error;
        }
    }



    async createZone(zoneCreateDto: ZoneDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Creating new zone: ' + zoneCreateDto.label);
            const zoneEntity = new Zone(zoneCreateDto.label, zoneCreateDto.plans);
            return await this.zoneRepository.save(zoneEntity);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating zone: ' + zoneCreateDto.label, error);
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


    async getZonesByName(label: string): Promise<any> {
        try {
            if (!label) return null;
            UbnetLoggerService.getInstance().log("Finding all zones by label" + label);
            return await this.zoneRepository.getZonesByName(label);
        } catch (error: any) {
            UbnetLoggerService.getInstance().error("Error finding all zones by label" + label, error);
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
import { ZoneDto } from "../models/dto/zone.create.dto";

export interface ZoneServiceInterface {
    createZone(zoneCreateDto: ZoneDto): Promise<any>
    getZonesWhithPlans(): Promise<any>
    getZonesByName(name: string): Promise<any>
    updateZoneById(id: string, zoneUpdateDto: ZoneDto): Promise<any>
}
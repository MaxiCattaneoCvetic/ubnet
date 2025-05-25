import { ZoneDto } from "../models/dto/zone.create.dto";

export interface ZoneServiceInterface {
    createZone(zoneCreateDto: ZoneDto): Promise<any>
    getZonesWhithPlans(): Promise<any>
    getZonesByName(label: string): Promise<any>
    updateZoneById(id: string, zoneUpdateDto: ZoneDto): Promise<any>
    deleteZoneById(id: string): Promise<any>
}
import { ZoneCreateDto } from "../models/dto/zone.create.dto";

export interface ZoneServiceInterface {
    createZone(zoneCreateDto: ZoneCreateDto): Promise<any>
    getZonesWhithPlans(): Promise<any>
    getZonesByName(name: string): Promise<any>
}
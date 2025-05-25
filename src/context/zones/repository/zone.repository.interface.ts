import { Zone } from "../models/entity/zone.entity";

export interface ZoneRepositoryInterface {
    save(zoneCreateDto: Zone): Promise<any>;
    getZonesWhithPlans(): Promise<any>;
    getZonesByName(label: string): Promise<any>;
    updateZoneById(id: string, zoneUpdateDto: Object): Promise<any>;
    deleteZoneById(id: string): Promise<any>;
}
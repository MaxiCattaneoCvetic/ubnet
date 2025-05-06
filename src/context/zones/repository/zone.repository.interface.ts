import { Zone } from "../models/entity/zone.entity";

export interface ZoneRepositoryInterface {
    save(zoneCreateDto: Zone): Promise<any>;
    getZonesWhithPlans(): Promise<any>;
}
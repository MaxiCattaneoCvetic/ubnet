import { ServiceCoverageAreaEntity } from "../models/entity/serviceCoverageArea.entity";

export interface ServiceCoverageAreaRepositoryInterface {
    save(serviceCoverageArea: ServiceCoverageAreaEntity): Promise<any>;
}
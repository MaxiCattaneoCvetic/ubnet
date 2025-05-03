import { ServiceCoverageAreasCreateDto } from "../models/dto/serviceCoverageAreas.dto";

export interface ServiceCoverageAreaInterface {
    createServiceCoverageArea(serviceCoverageAreasCreateDto: ServiceCoverageAreasCreateDto): Promise<any>
}
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { ServiceCoverageAreasCreateDto } from "../models/dto/serviceCoverageAreas.dto";
import { ServiceCoverageAreaInterface } from "./serviceCoverageArea.service.interface";
import { ServiceCoverageAreaEntity } from "../models/entity/serviceCoverageArea.entity";
import { ServiceCoverageAreaRepositoryInterface } from "../repository/serviceCoverageArea.repository.interface";
import { Inject } from "@nestjs/common";

export class ServiceCoverageAreaService implements ServiceCoverageAreaInterface {

    constructor(
        @Inject('ServiceCoverageAreaRepositoryInterface')
        private readonly serviceCoverageAreaRepository: ServiceCoverageAreaRepositoryInterface
    ) { }

    async createServiceCoverageArea(serviceCoverageAreasCreateDto: ServiceCoverageAreasCreateDto): Promise<any> {
        try {
            UbnetLoggerService.getInstance().log('Creating new service coverage area...');
            const serviceCoverageArea = new ServiceCoverageAreaEntity();

            return await this.serviceCoverageAreaRepository.save(serviceCoverageArea);

        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error creating service coverage area', error);
            throw error;
        }
    }
}
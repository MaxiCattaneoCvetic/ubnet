import { ServiceCoverageAreaRepositoryInterface } from "./serviceCoverageArea.repository.interface";

export class ServiceCoverageAreaRepositor implements ServiceCoverageAreaRepositoryInterface {

    async save(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}
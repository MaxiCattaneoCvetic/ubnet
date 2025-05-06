import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ZoneController } from './controller/zone.controller';
import { ZoneService } from './service/zone.service';
import { ZoneRepository } from './repository/zone.repository';
import { ZoneModel } from './models/schemas/zone.schema';





@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ZoneModel.modelName,
                schema: ZoneModel.schema,
            },
        ]),
    ],
    controllers: [
        ZoneController
    ],
    providers: [
        {
            provide: 'ZoneServiceInterface',
            useClass: ZoneService
        },
        {
            provide: 'ZoneRepositoryInterface',
            useClass: ZoneRepository
        },
    ],
})
export class ZoneModule { }

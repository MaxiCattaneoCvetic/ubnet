import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ZoneController } from './controller/zone.controller';
import { ZoneService } from './service/zone.service';
import { ZoneRepository } from './repository/zone.repository';
import { ZoneModel } from './models/schemas/zone.schema';
import { AuthModule } from '../Shared/auth/auth.module';





@Module({
    imports: [
        MongooseModule.forFeature([
            {
                label: ZoneModel.modelName,
                schema: ZoneModel.schema,
            },
        ]),
        AuthModule,
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

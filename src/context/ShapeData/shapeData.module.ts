import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShapeDataService } from './service/shapeData.service';
import {
    ShapeDataModel
} from './models/schema/shapeData.schema';
import { ShapeDataRepository } from './repository/shapeDatga.repository';
import { ShapeDataController } from './controller/shapeData.ccontroller';
import { AuthModule } from '../Shared/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ShapeDataModel.modelName,
                schema: ShapeDataModel.schema
            }
        ]),
        AuthModule,
    ],
    controllers: [ShapeDataController],
    providers: [
        {
            provide: 'ShapeDataServiceInterface',
            useClass: ShapeDataService
        }, {
            provide: 'ShapeDataRepositoryInterface',
            useClass: ShapeDataRepository
        }

    ],
})
export class ShapeModule { }
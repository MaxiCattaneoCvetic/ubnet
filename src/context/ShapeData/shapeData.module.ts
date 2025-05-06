import { Module } from '@nestjs/common';
import { ShapeDataService } from './service/shapeData.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'ShapeData', schema: ShapeDataSchema }
        ])
    ],
    providers: [
        {
            provide: 'ShapeDataServiceInterface',
            useClass: ShapeDataService
        }
    ],
})
export class ShapeModule { }
import { Module } from '@nestjs/common';
import { LoggerModule } from '../Shared/logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionPlanController } from './controller/subscriptionPlan.controller';
import { SubscriptionPlanService } from './service/subscriptionPlan.service';
import { SubscriptionPlanRepository } from './repository/subscriptionPlan.repository';
import { SubscriptionPlanModel } from './models/schema/subscriptionPlan.schema';
import { InternetPlanModel } from './models/schema/internet.plan.schema';
import { SecurityPlanModel } from './models/schema/security.plan.schema';
import { AuthModule } from '../Shared/auth/auth.module';

@Module({
    imports: [
        LoggerModule,
        MongooseModule.forFeature([
            {
                name: SubscriptionPlanModel.modelName,
                schema: SubscriptionPlanModel.schema,
                discriminators: [
                    { name: InternetPlanModel.modelName, schema: InternetPlanModel.schema },
                    { name: SecurityPlanModel.modelName, schema: SecurityPlanModel.schema },
                ],
            },
        ]),
        AuthModule,
    ],
    controllers: [SubscriptionPlanController],
    providers: [
        {
            provide: 'SubscriptionPlanServiceInterface',
            useClass: SubscriptionPlanService
        },
        {
            provide: 'SubscriptionPlanRepositoryInterface',
            useClass: SubscriptionPlanRepository
        }
    ],
    exports: [MongooseModule]
})
export class SubscriptionPlanModule { }
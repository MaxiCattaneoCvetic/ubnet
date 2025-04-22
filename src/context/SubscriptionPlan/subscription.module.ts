import { Module } from '@nestjs/common';
import { LoggerModule } from '../Shared/logger/logger.module';

import { SubscriptionPlanController } from './controller/subscriptionPlan.controller';
import { SubscriptionPlanService } from './service/subscriptionPlan.service';

@Module({
    imports: [
        LoggerModule,
    ],
    controllers: [SubscriptionPlanController],
    providers: [
        {
            provide: 'SubscriptionPlanServiceInterface',
            useClass: SubscriptionPlanService
        }
    ],
})
export class AppModule { }
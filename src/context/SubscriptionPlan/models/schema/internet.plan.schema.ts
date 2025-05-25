import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';

import { SubscriptionPlanDocument } from './subscriptionPlan.schema';



@Schema()
export class InternetPlanDocument extends SubscriptionPlanDocument {
    @Prop({ required: true })
    uploadDownloadValues: {
        upload: string,
        download: string
    };
}

export const InternetPlanSchema = SchemaFactory.createForClass(InternetPlanDocument);
export const InternetPlanModel = model<InternetPlanDocument>('InternetPlanModel', InternetPlanSchema);
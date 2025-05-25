import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';

import { SubscriptionPlanDocument } from './subscriptionPlan.schema';



class uploadDownloadValues {
    upload: string
    download: string
}

@Schema()
export class InternetPlanDocument extends SubscriptionPlanDocument {
    @Prop({ type: uploadDownloadValues, required: true })
    uploadDownloadValues: {
        upload: string,
        download: string
    };
}

export const InternetPlanSchema = SchemaFactory.createForClass(InternetPlanDocument);
export const InternetPlanModel = model<InternetPlanDocument>('InternetPlan', InternetPlanSchema);
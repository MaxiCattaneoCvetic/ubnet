import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubscriptionPlanDocument } from './subscriptionPlan.schema';
import { model } from 'mongoose';



@Schema()
export class InternetPlanDocument extends SubscriptionPlanDocument {
    @Prop({ required: true, type: Boolean })
    isFeature: boolean;

    @Prop({ required: true })
    uploadDownloadValues: {
        upload: string,
        download: string
    };

}

export const InternetPlanSchema = SchemaFactory.createForClass(InternetPlanDocument);
export const InternetPlanModel = model<InternetPlanDocument>('InternetPlanModel', InternetPlanSchema);
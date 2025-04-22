
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';

@Schema({
    discriminatorKey: 'type',
})
export class SubscriptionPlanDocument extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    detail: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    isActive: boolean;

    @Prop({ required: true })
    region: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    isPromotionPlan: boolean;

    @Prop({ required: false })
    sideText?: string;
}

export const SubscriptionPlanSchema = SchemaFactory.createForClass(SubscriptionPlanDocument);
export const SubscriptionPlanModel = model<SubscriptionPlanDocument>('SubscriptionPlanModel', SubscriptionPlanSchema);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { PlanType } from '../entity/enums/planType.enum';

@Schema({
    discriminatorKey: 'type',
})
export class SubscriptionPlanDocument extends Document {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    detail: string;

    @Prop({ type: String, required: true })
    price: string;

    @Prop({ type: Boolean, required: true })
    isActive: boolean;

    @Prop({ type: String, required: true })
    region: string;

    @Prop({ type: String, enum: [PlanType.CAMERA, PlanType.FIBER, PlanType.FIVEG], required: true })
    type: string;

    @Prop({ type: Boolean, required: true })
    isPromotionPlan: boolean;

    @Prop({ type: String, required: false })
    sideText?: string;

    @Prop({ type: String, required: false })
    featuredMessage?: string
}

export const SubscriptionPlanSchema = SchemaFactory.createForClass(SubscriptionPlanDocument);
export const SubscriptionPlanModel = model<SubscriptionPlanDocument>('SubscriptionPlanModel', SubscriptionPlanSchema);
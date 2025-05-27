
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { PlanType } from '../entity/enums/planType.enum';

@Schema({
    discriminatorKey: 'type',
})
export class SubscriptionPlanDocument extends Document {
    @Prop({ type: String, required: true })
    title: string;

    @Prop([{ type: String, required: true }])
    detail: string[];

    @Prop({ type: Boolean, required: true })
    isActive: boolean;

    @Prop({ type: String, enum: [PlanType.SECURITY, PlanType.FIBER, PlanType.FIVEG], required: true })
    planType: PlanType;

    @Prop({ type: String, required: false })
    sideText?: string;

    @Prop({ type: Boolean, required: false })
    isFeature?: boolean
}

export const SubscriptionPlanSchema = SchemaFactory.createForClass(SubscriptionPlanDocument);
export const SubscriptionPlanModel = model<SubscriptionPlanDocument>('SubscriptionPlan', SubscriptionPlanSchema);
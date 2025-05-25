import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubscriptionPlanDocument } from './subscriptionPlan.schema';
import { model } from 'mongoose';



@Schema()
export class SecurityPlanDocument extends SubscriptionPlanDocument {
    @Prop({ type: Number, required: true })
    price: number;

}

export const SecurityPlanSchema = SchemaFactory.createForClass(SecurityPlanDocument);
export const SecurityPlanModel = model<SecurityPlanDocument>('SecurityPlanModel', SecurityPlanSchema);
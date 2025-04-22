import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubscriptionPlanDocument } from './subscriptionPlan.schema';
import { model } from 'mongoose';



@Schema()
export class CameraPlanDocument extends SubscriptionPlanDocument {
}

export const CameraPlanSchema = SchemaFactory.createForClass(CameraPlanDocument);
export const CameraPlanModel = model<CameraPlanDocument>('CameraPlanModel', CameraPlanSchema);
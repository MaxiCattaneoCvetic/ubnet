import { Schema, model, Document, Types } from 'mongoose';


interface ZoneDocument extends Document {
    label: string;
    plans: Types.ObjectId[]
}


const ZoneSchema = new Schema<ZoneDocument>({
    label: { type: String, required: true },
    plans: { type: [Types.ObjectId], ref: 'SubscriptionPlan', required: true }
})

const ZoneModel = model<ZoneDocument>('zone', ZoneSchema)
export { ZoneModel, ZoneSchema, ZoneDocument }
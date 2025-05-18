import { Schema, model, Document } from 'mongoose';

interface AdvertiserBannerDocument extends Document {
    description: string;
    imageUrl: string;
    mobileImageUrl: string;
    isActive: Boolean;
    order: number
}


const AdvertiserBannerSchema = new Schema<AdvertiserBannerDocument>(
    {
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        mobileImageUrl: { type: String, required: true },
        isActive: { type: Boolean, required: true },
        order: { type: Number, required: true }
    }
)

const AdvertiserBannerModel = model<AdvertiserBannerDocument>('advertiserbanner', AdvertiserBannerSchema)
export { AdvertiserBannerModel, AdvertiserBannerSchema, AdvertiserBannerDocument }
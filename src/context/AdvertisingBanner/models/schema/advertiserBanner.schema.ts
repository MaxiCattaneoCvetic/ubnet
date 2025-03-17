import { Schema, model, Document, Date } from 'mongoose';

interface AdvertiserBannerDocument extends Document {
    description: string;
    imageUrl: string;
    isActive: Boolean
}


const AdvertiserBannerSchema = new Schema<AdvertiserBannerDocument>(
    {
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        isActive: { type: Boolean, required: true },
    }
)

const AdvertiserBannerModel = model<AdvertiserBannerDocument>('advertiserbanner', AdvertiserBannerSchema)
export { AdvertiserBannerModel, AdvertiserBannerSchema, AdvertiserBannerDocument }
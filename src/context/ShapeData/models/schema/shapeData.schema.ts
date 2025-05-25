import { Schema, model, Document } from 'mongoose';
import { ShapeDataType } from "../enum/shapeData.type.enum";


const CircleDataSchema = new Schema({
    center: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    radius: { type: Number, required: true },
}, { _id: false });


const PolygonDataSchema = new Schema({
    path: [
        {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    ],
}, { _id: false });


interface ShapeDataDocument extends Document {
    type: ShapeDataType;
    clientId: string;
    circle?: {
        center: { lat: number; lng: number };
        radius: number;
    };
    polygon?: {
        path: { lat: number; lng: number }[];
    };
}

const ShapeDataSchema = new Schema<ShapeDataDocument>(
    {
        type: { type: String, enum: Object.values(ShapeDataType), required: true },
        clientId: { type: String, required: true },
        circle: { type: CircleDataSchema, required: false },
        polygon: { type: PolygonDataSchema, required: false },
    },
    { timestamps: true }
);


const ShapeDataModel = model<ShapeDataDocument>('shapeData', ShapeDataSchema);
export { ShapeDataModel, ShapeDataSchema, ShapeDataDocument };
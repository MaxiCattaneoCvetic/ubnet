import { ShapeDataType } from "../enum/shapeData.type.enum";
import { CircleData } from "./interfaces/circleData";
import { PolygonData } from "./interfaces/polygonData";


export class ShapeData {
    private type: ShapeDataType;
    private clientId: string;
    private circle?: CircleData;
    private polygon?: PolygonData;



    constructor(type: ShapeDataType, clientId: string, circle?: CircleData, polygon?: PolygonData) {
        this.type = type;
        this.clientId = clientId;
        this.circle = circle;
        this.polygon = polygon;
    }


}
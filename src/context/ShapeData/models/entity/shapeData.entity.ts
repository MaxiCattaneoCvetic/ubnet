import { ShapeDataType } from "../enum/shapeData.type.enum";
import { CircleData } from "./interfaces/circleData";
import { PolygonData } from "./interfaces/polygonData";


export class ShapeData {

    private type: ShapeDataType;
    private clientId: string;
    private circle?: CircleData;
    private polygon?: PolygonData;
    private _id?: string;


    constructor(type: ShapeDataType, clientId: string, circle?: CircleData, polygon?: PolygonData, _id?: string) {

        this.type = type;
        this.clientId = clientId;
        this.circle = circle;
        this.polygon = polygon;
        this._id = _id;
    }


    get getId() { return this._id; }





}
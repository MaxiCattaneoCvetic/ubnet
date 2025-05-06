import { Types } from "mongoose";

export class Zone {
    private name: string;
    private plans: Types.ObjectId[];

    constructor(name: string, plans: Types.ObjectId[]) {
        this.name = name;
        this.plans = plans;
    }

}
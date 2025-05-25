import { Types } from "mongoose";

export class Zone {
    private label: string;
    private plans: Types.ObjectId[];

    constructor(label: string, plans: Types.ObjectId[]) {
        this.label = label;
        this.plans = plans;
    }

}
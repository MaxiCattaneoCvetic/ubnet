
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UserAuthRepositoryInterface } from "./auth.repository.interface";
import { UserDocument, UserModel } from "src/context/user/models/schemas/user.schema";


export class UserAuthRepository implements UserAuthRepositoryInterface {
    constructor(
        @InjectModel(UserModel.modelName)
        private readonly userModel: Model<UserDocument>
    ) { }



    async findByEmail(email: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ email: email });
            return user;
        } catch (error: any) {
            throw error;
        }
    }
}
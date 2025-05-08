import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';


import { User } from "../models/entity/user.entity";
import { UserRepositoryInterface } from "./user.repository.interface";
import { UserDocument, UserModel } from "../models/schemas/user.schema";
import { UbnetLoggerService } from "src/context/Shared/logger/logger.service";
import { BadRequestException } from "@nestjs/common";

export class UserRepository implements UserRepositoryInterface {

    constructor(
        @InjectModel(UserModel.modelName)
        private readonly userModel: Model<UserDocument>
    ) { }

    async saveUser(user: User): Promise<any> {
        try {
            const userDocument = new this.userModel(user);
            const disponibility = await this.checkDisponibility()
            if (!disponibility) throw new BadRequestException("Max users reached")
            await userDocument.save();
            UbnetLoggerService.getInstance().log('User saved Successfully');
        } catch (error: any) {
            UbnetLoggerService.getInstance().error('Error saving user', error);
            throw error;
        }
    }

    async checkDisponibility(): Promise<boolean> {
        try {
            const user = await this.userModel.find();
            if (user.length > 50) return false;
            return true;
        } catch (error: any) {
            throw error;
        }
    }


}
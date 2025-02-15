import { UserRegisterDto } from "../models/user.register.dto";

export interface UserServiceInterface {
    findOne(username: string): Promise<any>;
    register(userRegisterDto: UserRegisterDto): Promise<any>
}
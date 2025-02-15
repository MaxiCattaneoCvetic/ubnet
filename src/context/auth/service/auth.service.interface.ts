import { UserRegisterDto } from "src/context/user/models/user.register.dto";

export interface AuthServiceInterface {
    login(username: string, pass: string): Promise<any>;

}
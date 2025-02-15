import * as bcrypt from 'bcrypt';



import { UserRegisterDto } from "../models/user.register.dto";
import { UserServiceInterface } from "./user.service.interface";
export class UserService implements UserServiceInterface {

    private users: any[];
    private readonly saltOrRounds: number

    constructor(


    ) {
        this.users = [
            {
                userId: 1,
                username: 'john',
                password: 'changeme',
            },
            {
                userId: 2,
                username: 'maria',
                password: 'guess',
            },
        ];
        this.saltOrRounds = 13;
    }




    async findOne(username: string) {
        return this.users.find(user => user.username === username);
    }

    async register(userRegisterDto: UserRegisterDto): Promise<any> {
        try {
            // this.logger.log('Registering user.....');
            const paswordHashed = await bcrypt.hash(userRegisterDto.password, this.saltOrRounds);
            console.log(paswordHashed)
            return Promise.resolve(userRegisterDto);
        } catch (error: any) {
            throw error;
        }
    }



}
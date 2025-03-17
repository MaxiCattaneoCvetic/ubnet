
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


import { UserServiceInterface } from 'src/context/user/service/user.service.interface';
import { AuthServiceInterface } from './auth.service.interface';






export class AuthService implements AuthServiceInterface {
    private readonly saltOrRounds: number
    constructor(

        @Inject('UserServiceInterface')
        private readonly userService: UserServiceInterface,
        private readonly jwtService: JwtService,

    ) {

    }


    // async login(
    //     username: string,
    //     pass: string,
    // ): Promise<{ access_token: string }> {
    //     const user = await this.userService.findOne(username);
    //     if (user?.password !== pass) {
    //         throw new UnauthorizedException();
    //     }
    //     const payload = { sub: user.userId, username: user.username };
    //     return {
    //         access_token: await this.jwtService.signAsync(payload),
    //     };
    // }
}

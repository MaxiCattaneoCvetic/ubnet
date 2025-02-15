import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";

import { UserRegisterDto } from "../models/user.register.dto";
import { AuthServiceInterface } from "src/context/auth/service/auth.service.interface";
import { UserServiceInterface } from "../service/user.service.interface";

@Controller('register')
export class UserController {

    constructor(
        @Inject('UserServiceInterface')
        private userService: UserServiceInterface
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post()
    register(@Body() userDto: UserRegisterDto) {
        try {
            return this.userService.register(userDto);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}
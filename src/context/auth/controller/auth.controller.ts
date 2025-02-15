import { Body, Controller, Post, HttpCode, HttpStatus, Inject, Get, UseGuards, Request, } from '@nestjs/common';
import { AuthServiceInterface } from '../service/auth.service.interface';
import { AuthGuard } from '../guard/auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthServiceInterface')
        private authService: AuthServiceInterface
    ) { }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() signInDto: Record<string, any>) {
        return this.authService.login(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Get('status')
    status() {
        return "on"
    }



    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }


}



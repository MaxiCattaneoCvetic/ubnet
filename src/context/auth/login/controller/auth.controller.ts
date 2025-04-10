import {
    Body, Controller, Post, HttpCode, HttpStatus, Inject
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { LoginDto, LoginDto_response } from '../models/dto/login.dto';
import { AuthServiceInterface } from '../service/auth.service.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AuthServiceInterface')
        private readonly authService: AuthServiceInterface,

    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'Returns JWT token and user info',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    id: '507f1f77bcf86cd799439011',
                    email: 'user@example.com',
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized, invalid credentials' })
    @ApiResponse({ status: 500, description: 'Internal Server Error, contact the administrator' })
    async login(@Body() loginDto: LoginDto): Promise<LoginDto_response> {
        return this.authService.login(loginDto);
    }


}



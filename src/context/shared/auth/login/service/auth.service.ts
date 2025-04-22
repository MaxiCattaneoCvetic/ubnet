import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


import { LoginDto, LoginDto_response } from '../models/dto/login.dto';
import { AuthServiceInterface } from './auth.service.interface';
import { UserAuthRepositoryInterface } from '../repository/auth.repository.interface';
import { UbnetLoggerService } from 'src/context/Shared/logger/logger.service';


@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private jwtService: JwtService,
    @Inject('UserAuthRepositoryInterface')
    private userAuthRepository: UserAuthRepositoryInterface
  ) { }

  async login(loginDto: LoginDto): Promise<LoginDto_response> {
    UbnetLoggerService.getInstance().log('Initiating login process');

    const { email, password } = loginDto;

    const user = await this.userAuthRepository.findByEmail(email);
    if (!user) {
      UbnetLoggerService.getInstance().error('User not found');
      throw new UnauthorizedException('Invalid credentials');
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      UbnetLoggerService.getInstance().warn('Invalid password');
      throw new UnauthorizedException('Invalid credentials');
    }



    const payload = {
      sub: user._id,
      email: user.email,
    };

    return {
      
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user._id,
        email: user.email,
      }
    };
  }
}

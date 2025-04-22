import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../user/user.module';
import { AuthController } from './login/controller/auth.controller';
import { AuthService } from './login/service/auth.service';
import { UserAuthRepository } from './login/repository/auth.repository';
import { UserModel } from '../user/models/schemas/user.schema';
import { AuthGuard } from './guard/auth.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature([
            {
              name: UserModel.modelName,
              schema: UserModel.schema,
            },
          ]),
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '60s',
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: 'AuthServiceInterface',
            useClass: AuthService,
        },
        {
            provide: 'UserAuthRepositoryInterface',
            useClass: UserAuthRepository,
        },
        {
            provide: 'AuthGuard',
            useClass: AuthGuard,
        }
    ],
    exports: [
        JwtModule,
        {
            provide: 'AuthGuard',
            useClass: AuthGuard,
        }
    ]
})
export class AuthModule { }

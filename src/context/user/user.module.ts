import { Module } from '@nestjs/common';


import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';


@Module({
    controllers: [
        UserController
    ],
    providers: [
        {
            provide: 'UserServiceInterface',
            useClass: UserService
        },
    ],
    exports: [
        'UserServiceInterface',
    ]
})
export class UserModule { }

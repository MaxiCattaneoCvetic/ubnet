import { Module } from '@nestjs/common';


import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './models/schemas/user.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: UserModel.modelName,
              schema: UserModel.schema,
            },
          ]),
    ],
    controllers: [
        UserController
    ],
    providers: [
        {
            provide: 'UserServiceInterface',
            useClass: UserService
        },
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        },
    ],
    exports: [
        'UserServiceInterface',
    ]
})
export class UserModule { }

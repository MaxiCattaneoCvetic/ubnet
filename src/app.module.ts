import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './context/user/user.module';
import { AuthModule } from './context/auth/auth.module';
import { LoggerModule } from './context/shared/logger/logger.module';
import { DatabaseModule } from './context/shared/database/database.module';


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la aplicación
      envFilePath: '.env', // Indica el archivo donde están las variables
    }),
    AuthModule,
    UserModule,
    DatabaseModule
  ],
  providers: [],
})
export class AppModule { }

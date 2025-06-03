import { NestFactory } from '@nestjs/core';
import { onRequest } from 'firebase-functions/v2/https';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ShapeDataCircleCreateDto, ShapeDataPolygonCreateDto } from './context/ShapeData/models/dto/shapeData.create.dto';

const expressServer = express();
let app: NestExpressApplication;

const initializeNestApp = async (): Promise<NestExpressApplication> => {
  if (!app) {
    app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressServer),
    );

    // 1️⃣ Helmet: aplicar antes de CORS o cualquier middleware
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", 'https:'],
            styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
            fontSrc: ["'self'", 'fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
            manifestSrc: ["'self'", 'apollo-server-landing-page.cdn.apollographql.com'],
            frameSrc: ["'self'", 'sandbox.embed.apollographql.com'],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
          },
        },
        frameguard: { action: 'sameorigin' },
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        hidePoweredBy: true,
        noSniff: true,
      }),
    );


    app.use((req, res, next) => {
      res.setHeader(
        'Permissions-Policy',
        'geolocation=(), camera=(), microphone=(), payment=(), usb=()'
      );
      next();
    });


    app.enableCors({
      origin: ['https://ubnet-client.vercel.app'],
      credentials: true,
    });


    const config = new DocumentBuilder()
      .setTitle('UBNET')
      .setDescription('The UBNET API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config, {
      extraModels: [ShapeDataCircleCreateDto, ShapeDataPolygonCreateDto],
    });

    SwaggerModule.setup('api', app, documentFactory, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    await app.init();
    console.log(`Server initialized`);
  }
  return app;
};

export const api = onRequest(async (request, response) => {
  await initializeNestApp();
  expressServer(request, response);
});

async function bootstrap() {
  const app = await initializeNestApp();
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder().setTitle("SPA API").setDescription("SPA Backend").setVersion("1.0").build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  app.enableCors({origin: "http://localhost:5173"});

  await app.listen(5000);

  console.log(`Swagger running on http://localhost:5000/api`);
}

bootstrap();

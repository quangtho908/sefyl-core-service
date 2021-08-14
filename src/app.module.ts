import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { enviroment } from './enviroment/enviroment';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      enviroment.mongo.uri,
      {useNewUrlParser: true, useUnifiedTopology: true}
    ),
    UserModule,
    AuthModule
  ],
})
export class AppModule {}

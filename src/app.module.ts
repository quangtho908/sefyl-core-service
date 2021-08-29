import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { env } from './shared/enviroment/enviroment';
import { IoredisModule } from './ioredis/ioredis.module';
import { UserModule } from './user/user.module';
import { MasterDataModule } from './masterData/masterData.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      env.mongo.uri,
      {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    ),
    ServeStaticModule.forRoot({
      rootPath: `${env.uploads.dirname}/uploads`
    }),
    IoredisModule.register({
      host: env.redis.host,
      port: env.redis.port,
      password: env.redis.password
    }),
    UserModule,
    AuthModule,
    MasterDataModule
  ],
})
export class AppModule {}
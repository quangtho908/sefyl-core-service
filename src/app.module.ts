import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { uploads, mongo, redis } from './shared/enviroment/enviroment';
import { IoredisModule } from './ioredis/ioredis.module';
import { UserModule } from './user/user.module';
import { MasterDataModule } from './masterData/masterData.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      mongo.uri,
      {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    ),
    ServeStaticModule.forRoot({
      rootPath: `${uploads.dirname}/uploads`
    }),
    IoredisModule.register({
      host: redis.host,
      port: redis.port,
      password: redis.password
    }),
    UserModule,
    AuthModule,
    MasterDataModule
  ],
})
export class AppModule {}
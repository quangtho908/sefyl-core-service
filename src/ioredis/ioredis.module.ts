import { DynamicModule, Global, Module } from "@nestjs/common";
import { IoredisService } from "./ioredis.service";

@Global()
@Module({})
export class IoredisModule {

    static register(options): DynamicModule {
        return {
            module: IoredisModule,
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options
                },
                IoredisService
            ],
            exports: [IoredisService]
        }
    }
}
import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis"
@Injectable()
export class IoredisService {
    private client: Redis;
    constructor(@Inject('CONFIG_OPTIONS') options) {
        const {host, port, password} = options;
        this.client = new Redis({host, port, password});
    }

    setValue(key: string, value: string, ex: number = 5) {
        this.client.set(key, value, "EX", ex);
    }
    
    async getValue(key: string): Promise<string> {
        return await this.client.get(key);
    }

    async delValue(key: string): Promise<void> {
        await this.client.del(key)
    }
}
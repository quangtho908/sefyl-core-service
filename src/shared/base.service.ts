import { InternalServerErrorException } from "@nestjs/common";
import { EnforceDocument, Model, Query, Types, Document } from "mongoose";
import { MongoError } from "mongodb";


export class BaseService<T extends Document> {
    constructor(
        protected model?: Model<T>
    ) {}

    throwMongoError(err: MongoError): MongoError {
        throw new InternalServerErrorException(err, err.errmsg)
    }

    toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }

    async findAll(filter = {}): Promise<Query<any, T>> {
        try{
            return await this.model.find(filter);
        }catch(err) {
            this.throwMongoError(err);
        }
    }

    async findById(id: string): Promise<Query<any, T>> {
        try{
            return await this.model.findById(id);
        }catch(err) {
            this.throwMongoError(err);
        }
    }

    async findOne(filter = {}): Promise<Query<any, T>> {
        try{
            return await this.model.findOne(filter);
        }catch(err) {
            this.throwMongoError(err);
        }
    }
    async create(data: any): Promise<EnforceDocument<T, any>> {
        try{
            return await this.model.create(data);
        }catch(err){
            this.throwMongoError(err);
        } 
    }

    async updateOne(data: any, filter = {}): Promise<Query<any, T>> {
        try{
            return await this.model.findOneAndUpdate(filter, data);
        }catch(err) {
            this.throwMongoError(err);
        }
    }

    async updateOneById(data: any, id: string): Promise<Query<any, T>> {
        try{
            return await this.model.findByIdAndUpdate(id, data);
        }catch(err) {
            this.throwMongoError(err);
        }
    }

    async updateAll(filter = {}, data: any): Promise<Query<any, T>> {
        try{
            return await this.model.updateMany(filter, data);
        }catch(err){
            this.throwMongoError(err);
        }
    }

    async deleteOne(filter = {}): Promise<any>
    {
        try{
            return await this.model.deleteOne(filter);
        }catch(err){
            this.throwMongoError(err);
        }
    }

    async deleteOneById(id: string): Promise<any> {
        try{
            return await this.model.findByIdAndDelete(id);
        }catch(err) {
            this.throwMongoError(err);
        }
    }
}
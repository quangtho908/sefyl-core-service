import { InternalServerErrorException } from "@nestjs/common";
import { Error, FilterQuery, Model, Query, QueryOptions, SaveOptions, Types, UpdateQuery, UpdateWriteOpResult, Document } from "mongoose";
import { DeleteResult } from "mongodb";

export class BaseService<T extends Document> {
    constructor(
        protected _model: Model<T>
    ) {}
    
    throwMongooseError(err: Error): Error{
        throw new InternalServerErrorException(err);
    }

    toObjectId(id: string){
        return Types.ObjectId(id);
    }

    async findByIdAsync(
        id: string | Types.ObjectId,
        select?: string | string[] | {[feildname: string]: any},
        options?: QueryOptions
    ): Promise<T> {
        try {
            return await this._model.findById(id, select, options).lean();
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    async findOneAsync(
        filter: FilterQuery<T>,
        select?: string | string[] | {[feildname: string]: any},
        options?: QueryOptions
    ): Promise<T>{
        try{
            return await this._model.findOne(filter, select, options).lean();
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    async findAsync(
        filter: FilterQuery<T> = {},
        select?: string | string[] | {[feildname: string]: any},
        options?: QueryOptions
    ): Promise<T[]>{
        try{
            return await this._model.find(filter, select, options).lean();
        }catch(err){
            this.throwMongooseError(err);
        }
    }

    findById(
        id: string | Types.ObjectId,
        select?: string | string[] | {[feildname: string]: any},
        options?: QueryOptions
    ): Query<T, {}> {
        try {
            return this._model.findById(id, select, options);
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    findOne(
        filter: FilterQuery<T>,
        select?: string | string[] | {[feildname: string]: any},
        options?: QueryOptions
    ): Query<T, {}> {
        try{
            return this._model.findOne(filter, select, options);
        }catch(err){
            this.throwMongooseError(err);
        }
    }
    
    find(
        filter: FilterQuery<T> = {},
        select?: string | string[] | {[feildname: string]: any},
        options?: QueryOptions
    ): Query<T[], {}> {
        try{
            return this._model.find(filter, select, options);
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    create<M>(data: M): Promise<T> {
        try{
            return this._model.create(data);
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    createMany<M>(
        data: M[],
        options: SaveOptions
    ): Promise<T[]>{
        try{
            return this._model.create(data, options);
        }catch(err) {
            this.throwMongooseError(err)
        }
    }

    async updateByIdAsync(
        id: string | Types.ObjectId,
        data: UpdateQuery<T>,
        options?: QueryOptions
    ): Promise<T> {
        try{
            return await this._model.findByIdAndUpdate(id, data, options).lean();
        }catch(err){
            this.throwMongooseError(err);
        }
    }

    async updateOne(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>,
        options?: QueryOptions
    ): Promise<UpdateWriteOpResult>{
        try{
            return await this._model.updateOne(filter, update, options); 
        }catch(err){
            this.throwMongooseError(err);
        }
    }

    async updateMany(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>,
        options?: QueryOptions
    ): Promise<UpdateWriteOpResult>{
        try{
            return await this._model.updateMany(filter, update, options);
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    updateById(
        id: string,
        data: UpdateQuery<T>,
        options?: QueryOptions
    ): Query<T, {}> {
        try{
            return this._model.findByIdAndUpdate(id, data, options);
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    async deleteByIdAsync(
        id: string,
        options?: QueryOptions
    ): Promise<T>{
        try{
            return await this._model.findByIdAndDelete(id, options).lean();
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    async deleteOne(
        filter: FilterQuery<T>,
        options?: QueryOptions
    ): Promise<DeleteResult>{
        try{
            return await this._model.deleteOne(filter, options);
        }catch(err) {
            this.throwMongooseError(err);
        }
    }

    async deleteMany(
        filter: FilterQuery<T>,
        options?: QueryOptions
    ): Promise<DeleteResult>{
        try{
            return await this._model.deleteMany(filter, options);
        }catch(err){
            this.throwMongooseError(err);
        }
    }
    
    deleteById(
        id: string,
        options?: QueryOptions
    ): Query<T, {}> {
        try{
            return this._model.findByIdAndDelete(id, options);
        }catch(err){
            this.throwMongooseError(err);
        }
    }
}
import { Document } from 'mongoose';
export type CategoryDocument = Category & Document;
type typeName = {
    name: string;
    language: string;
};
type typeDes = {
    des: string;
    language: string;
};
export declare class Category {
    name: typeName[];
    description: typeDes[];
    parent_id?: string;
    url?: string;
    page: string;
}
export declare const CategorySchema: import("mongoose").Schema<Document<Category, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
export {};

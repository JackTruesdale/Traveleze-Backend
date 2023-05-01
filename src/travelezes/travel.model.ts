import * as mongoose from 'mongoose';

export const TravelSchema = new mongoose.Schema({
    dest: {type: String, required:true},
    price: {type: String, required:false},
    rating: {type: String, required:false},
    amen: {type: [String], required:false}, 
    dist: {type: String, required:true},

});

export interface Travel extends mongoose.Document {
    id: string,
    dest: string,
    price: string,
    rating: string,
    amen: Array<string>, 
    dist: string,

}
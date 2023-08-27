import mongoose, { Schema } from "mongoose";

const BlogsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    }
});


export const blogModel = mongoose.model('blogs' , BlogsSchema);

import mongoose, { Schema } from "mongoose";

//represenation of collections on DB 

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

export const userModel = mongoose.model("users", UserSchema);

import { UserRoleType } from "@/types/next-auth";
import mongoose from "mongoose";

export interface UserModelInterface extends mongoose.Document {
    userId: string,
    fullname: string,
    username: string,
    nickname: string,
    email: string,
    password: string,
    role: UserRoleType,
}

const userSchema = new mongoose.Schema<UserModelInterface>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
})

const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);
export default UserModel;
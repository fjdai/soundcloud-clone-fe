import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";


interface IUser {
    _id: string;
    username: string;
    email: string;
    isVerify: boolean;
    type: string;
    role: string;
}

declare module "next-auth" {


    interface Session {
        access_token: string;
        refresh_token: string;
        user: IUser;
    }


}

declare module "next-auth/jwt" {
    interface JWT {
        access_token: string;
        refresh_token: string;
        user: IUser;
    }
}
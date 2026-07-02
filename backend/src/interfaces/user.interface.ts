import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    age: number;
    role: RoleEnum;
    avatar: string;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

export interface IUserQuery {
    pageSize?: number;
    page?: number;
    search?: string;
    order?: string;
}

export type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

export type IUserUpdateDTO = Partial<
    Pick<IUser, "name" | "surname" | "age" | "isActive" | "password" | "avatar">
>;

export type IResetPasswordSendEmail = Pick<IUser, "email">;

export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };

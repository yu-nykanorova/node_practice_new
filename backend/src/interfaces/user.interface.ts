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
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

export type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

export type IUserUpdateDTO = Pick<
    IUser,
    "name" | "surname" | "age" | "isActive" | "password"
>;

export type IResetPasswordSendEmail = Pick<IUser, "email">;

export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };

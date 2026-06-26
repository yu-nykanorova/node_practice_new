import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().min(3).max(10).trim();
    private static surname = joi.string().regex(/^[A-Z][a-z]{1,9}$/);
    private static age = joi.number().min(2).max(100);
    private static isActive = joi.boolean();

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static updateIsActive = joi.object({
        isActive: this.isActive.required(),
    });
}

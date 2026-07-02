import joi from "joi";

import { PizzaQueryOrderEnum } from "../enums/pizza-query-order.enum";
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
        name: this.name,
        surname: this.surname,
        age: this.age,
        isActive: this.isActive,
    });

    public static updateIsActive = joi.object({
        isActive: this.isActive.required(),
    });

    public static setNewPassword = joi
        .object({
            password: this.password.required(),
        })
        .unknown(true);

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),
        order: joi
            .string()
            .valid(
                ...Object.values(PizzaQueryOrderEnum),
                ...Object.values(PizzaQueryOrderEnum).map((item) => `-${item}`),
            ),
    });
}

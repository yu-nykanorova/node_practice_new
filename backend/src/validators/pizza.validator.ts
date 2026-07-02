import joi from "joi";
import { UserQueryOrderEnum } from "../enums/user-query-order.enum";

export class PizzaValidator {
    private static name = joi.string().min(2).max(255).trim();
    private static price = joi.number().min(1).max(1000000);
    private static diameter = joi.number().min(1).max(255);

    public static create = joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        name: this.name,
        price: this.price,
        diameter: this.diameter,
        order: joi
            .string()
            .valid(
                ...Object.values(UserQueryOrderEnum),
                ...Object.values(UserQueryOrderEnum).map((item) => `-${item}`),
            ),
    });
}



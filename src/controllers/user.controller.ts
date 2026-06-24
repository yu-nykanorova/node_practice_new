import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IUserDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserDTO;
            const data = await userService.create(user);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id as string;
        const user = req.body as IUserDTO;
        const data = await userService.update(id, user);
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id as string;
        await userService.delete(id);
        res.status(StatusCodesEnum.NO_CONTENT).end();
    }

    public async getById(req: Request, res: Response) {
        const id = req.params.id as string;
        const data = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(data);
    }
}

export const userController = new UserController();

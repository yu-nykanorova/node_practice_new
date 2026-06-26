import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            const user = req.body as IUserUpdateDTO;
            const data = await userService.updateById(id, user);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id as string;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }

    public async changeActiveStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = req.params.id as string;
            const { userId: adminId } = res.locals
                .tokenPayload as ITokenPayload;
            const isActive = req.body.isActive as boolean;

            if (id === adminId) {
                throw new ApiError("Not allowed", StatusCodesEnum.FORBIDDEN);
            }

            const data = await userService.changeActiveStatus(id, isActive);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();

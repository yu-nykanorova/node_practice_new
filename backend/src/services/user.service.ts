import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IUser,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getAll(query: IUserQuery): Promise<IPaginatedResponse<IUser>> {
        const dataFromDb = await userRepository.getAll(query);
        let data, totalItems;
        if (dataFromDb.length) {
            data = dataFromDb[0].data;
            totalItems = dataFromDb[0].totalItems;
        } else {
            data = [];
            totalItems = 0;
        }
        const pageSize = query.pageSize || 10;
        const page = Number(query.page) || 1;
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(page - 1),
            nextPage: page + 1 <= totalPages,
            data,
        };
    }

    public async updateById(
        userId: string,
        userDataToUpdate: IUserUpdateDTO,
    ): Promise<IUser | null> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return await userRepository.updateById(userId, userDataToUpdate);
    }

    public async deleteById(userId: string): Promise<void> {
        const data = await userRepository.getById(userId);

        if (!data) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        await userRepository.deleteById(userId);
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);

        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BED_REQUEST,
            );
        }
    }

    public async changeActiveStatus(
        userId: string,
        isActive: boolean,
    ): Promise<IUser | null> {
        const data = await userRepository.getById(userId);

        if (!data) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return await userRepository.changeActiveStatus(userId, isActive);
    }
}

export const userService = new UserService();

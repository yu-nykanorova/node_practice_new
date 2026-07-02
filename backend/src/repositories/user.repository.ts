import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(query: IUserQuery): Promise<any> {
        // const skip = query.pageSize * (query.page - 1);
        const filterObject: Record<string, any> = { isDeleted: false };

        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }
        const orderObject: Record<string, any> = {};
        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1;
            } else {
                orderObject[query.order] = 1;
            }
        }
        // User.find(filterObject).limit(query.pageSize).skip(skip);
        return User.aggregate([
            {
                $match: filterObject,
            },
            {
                $sort: orderObject,
            },
            {
                $group: {
                    _id: null,
                    totalItems: { $sum: 1 },
                    data: { $push: "$$ROOT" },
                },
            },
            {
                $project: { _id: 0 },
            },
        ]);
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public updateById(
        userId: string,
        user: Partial<IUserUpdateDTO>,
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, user, { new: true });
    }

    public async deleteById(userId: string): Promise<void> {
        await User.findByIdAndDelete(userId);
    }

    public getById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    public getByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    public changeActiveStatus(
        userId: string,
        isActive: boolean,
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            {
                isActive: isActive,
            },
            { returnDocument: "after" },
        );
    }
}

export const userRepository = new UserRepository();

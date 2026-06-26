import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public updateById(
        userId: string,
        user: IUserUpdateDTO,
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
        const updatedUser = User.findByIdAndUpdate(
            userId,
            {
                isActive: isActive,
            },
            { returnDocument: "after" },
        );
        console.log(updatedUser);
        return updatedUser;
    }
}

export const userRepository = new UserRepository();

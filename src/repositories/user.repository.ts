import { IUser, IUserDTO } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user);
    }

    public update(userId: string, user: IUserDTO): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, user, { new: true });
    }

    public async delete(userId: string): Promise<void> {
        await User.findByIdAndDelete(userId);
    }

    public getById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }
}

export const userRepository = new UserRepository();

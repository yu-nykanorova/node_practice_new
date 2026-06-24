import { IUser, IUserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }

    public create(user: IUserDTO): Promise<IUser> {
        return userRepository.create(user);
    }

    public update(userId: string, user: IUserDTO): Promise<IUser | null> {
        return userRepository.update(userId, user);
    }

    public delete(userId: string): Promise<void> {
        return userRepository.delete(userId);
    }

    public getById(userId: string): Promise<IUserDTO | null> {
        return userRepository.getById(userId);
    }
}

export const userService = new UserService();

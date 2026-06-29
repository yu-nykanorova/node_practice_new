import { config } from "../configs/config";
import { emailConstants } from "../constants/email.constants";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailEnum } from "../enums/email.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
    IResetPasswordSendEmail,
    IResetPasswordSet,
    IUser,
    IUserCreateDTO,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(
        user: IUserCreateDTO,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });

        const actionToken = tokenService.generateActionTokens(
            {
                userId: newUser._id,
                role: newUser.role,
            },
            ActionTokenTypeEnum.ACTIVATE_USER,
        );

        await actionTokenRepository.create({
            token: actionToken,
            type: ActionTokenTypeEnum.ACTIVATE_USER,
            _userId: newUser._id,
        });

        await emailService.sendEmail(
            newUser.email,
            emailConstants[EmailEnum.WELCOME],
            { name: newUser.name, actionToken, frontUrl: config.FRONT_URL },
        );
        return { user: newUser, tokens };
    }

    public async signIn(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user) {
            throw new ApiError(
                "Email or password invalid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        if (!user.isActive) {
            throw new ApiError(
                "Your must activate your account at first",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        const isValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        );

        if (!isValidPassword) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }

    public async activateUser(
        payload: ITokenPayload,
        token: string,
    ): Promise<IUser | null> {
        const activatedUser = await userRepository.changeActiveStatus(
            payload.userId,
            true,
        );
        await actionTokenRepository.deleteActionTokens({ token });
        return activatedUser;
    }

    public async forgotPasswordSendEmail(
        dto: IResetPasswordSendEmail,
    ): Promise<void> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        const actionToken = tokenService.generateActionTokens(
            { userId: user._id, role: user.role },
            ActionTokenTypeEnum.FORGOT_PASSWORD,
        );

        await actionTokenRepository.create({
            token: actionToken,
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
            _userId: user._id,
        });

        await emailService.sendEmail(
            user.email,
            emailConstants[EmailEnum.FORGOT_PASSWORD],
            { actionToken, frontUrl: config.FRONT_URL },
        );
    }

    public async forgotPasswordChange(
        dto: IResetPasswordSet,
        payload: ITokenPayload,
    ): Promise<IUser | null> {
        const newPassword = await passwordService.hashPassword(dto.password);
        const user = await userRepository.getById(payload.userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        const updatedUser = await userRepository.updateById(payload.userId, {
            password: newPassword,
        });

        await actionTokenRepository.deleteActionTokens({
            token: dto.token,
        });

        return updatedUser;
    }
}

export const authService = new AuthService();

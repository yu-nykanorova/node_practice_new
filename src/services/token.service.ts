import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    public verifyToken(
        token: string,
        type: "access" | "refresh",
    ): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case "access":
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case "refresh":
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BED_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }

    public async isTokenExists(
        token: string,
        type: "accessToken" | "refreshToken",
    ): Promise<boolean> {
        const iTokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!iTokenPromise;
    }

    public generateActionTokens(
        payload: ITokenPayload,
        tokenType: ActionTokenTypeEnum,
    ): string {
        let secret: string;
        let tokenLifetime: jwt.SignOptions["expiresIn"];

        switch (tokenType) {
            case ActionTokenTypeEnum.ACTIVATE_USER:
                secret = config.ACTION_ACTIVATE_USER_SECRET;
                tokenLifetime = config.ACTION_ACTIVATE_USER_LIFETIME;
                break;
            case ActionTokenTypeEnum.FORGOT_PASSWORD:
                secret = config.ACTION_FORGOT_PASSWORD_SECRET;
                tokenLifetime = config.ACTION_FORGOT_PASSWORD_LIFETIME;
                break;
            default:
                throw new ApiError(
                    "Invalid token type",
                    StatusCodesEnum.BED_REQUEST,
                );
        }

        return jwt.sign(payload, secret, { expiresIn: tokenLifetime });
    }

    public verifyActionToken(
        token: string,
        type: ActionTokenTypeEnum,
    ): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case ActionTokenTypeEnum.ACTIVATE_USER:
                    secret = config.ACTION_ACTIVATE_USER_SECRET;
                    break;
                case ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = config.ACTION_FORGOT_PASSWORD_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BED_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }
}

export const tokenService = new TokenService();

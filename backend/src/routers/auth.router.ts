
import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);

router.post("/sign-in", authController.signIn);

router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.get("/me", authMiddleware.checkAccessToken, authController.me);

router.put(
    "/activate-user",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.ACTIVATE_USER),
    authController.activateUser,
);

router.post("/forgot-password", authController.forgotPasswordSendEmail);

router.put(
    "/forgot-password",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
    commonMiddleware.validateBody(UserValidator.setNewPassword),
    authController.forgotPasswordChange,
);

export const authRouter = router;

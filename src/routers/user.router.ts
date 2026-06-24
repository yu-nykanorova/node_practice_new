import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);
router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.update,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    userController.delete,
);
router.get("/:id", commonMiddleware.isIdValidate("id"), userController.getById);

export const userRouter = router;

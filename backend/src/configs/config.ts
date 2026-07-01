import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

interface IConfig {
    PORT: string;
    MONGO_URI: string;
    FRONT_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    ACTION_ACTIVATE_USER_SECRET: string;
    ACTION_ACTIVATE_USER_LIFETIME: any;
    ACTION_FORGOT_PASSWORD_SECRET: string;
    ACTION_FORGOT_PASSWORD_LIFETIME: any;
}

function checkEnv(value: string | undefined, name: string) {
    if (!value) {
        throw new Error(`Absent environment variable ${name}`);
    }
    return value;
}

const config: IConfig = {
    PORT: checkEnv(process.env.PORT, "PORT"),
    MONGO_URI: checkEnv(process.env.MONGO_URI, "MONGO_URI"),
    FRONT_URL: checkEnv(process.env.FRONT_URL, "FRONT_URL"),
    JWT_ACCESS_SECRET: checkEnv(
        process.env.JWT_ACCESS_SECRET,
        "JWT_ACCESS_SECRET",
    ),
    JWT_REFRESH_SECRET: checkEnv(
        process.env.JWT_REFRESH_SECRET,
        "JWT_REFRESH_SECRET",
    ),
    JWT_ACCESS_LIFETIME: checkEnv(
        process.env.JWT_ACCESS_LIFETIME,
        "JWT_ACCESS_LIFETIME",
    ),
    JWT_REFRESH_LIFETIME: checkEnv(
        process.env.JWT_REFRESH_LIFETIME,
        "JWT_REFRESH_LIFETIME",
    ),
    EMAIL_USER: checkEnv(process.env.EMAIL_USER, "EMAIL_USER"),
    EMAIL_PASSWORD: checkEnv(process.env.EMAIL_PASSWORD, "EMAIL_PASSWORD"),
    ACTION_ACTIVATE_USER_SECRET: checkEnv(
        process.env.ACTION_ACTIVATE_USER_SECRET,
        "ACTION_ACTIVATE_USER_SECRET",
    ),
    ACTION_ACTIVATE_USER_LIFETIME: checkEnv(
        process.env.ACTION_ACTIVATE_USER_LIFETIME,
        "ACTION_ACTIVATE_USER_LIFETIME",
    ),
    ACTION_FORGOT_PASSWORD_SECRET: checkEnv(
        process.env.ACTION_FORGOT_PASSWORD_SECRET,
        "ACTION_FORGOT_PASSWORD_SECRET",
    ),
    ACTION_FORGOT_PASSWORD_LIFETIME: checkEnv(
        process.env.ACTION_FORGOT_PASSWORD_LIFETIME,
        "ACTION_FORGOT_PASSWORD_LIFETIME",
    ),
};

export { config };

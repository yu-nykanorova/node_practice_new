import dotenv from "dotenv";

dotenv.config();

interface IConfig {
    PORT: string;
    MONGO_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
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
};

export { config };

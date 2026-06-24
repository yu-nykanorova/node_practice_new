import dotenv from "dotenv";

dotenv.config();

function checkEnv(value: string | undefined, name: string) {
    if (!value) {
        throw new Error(`Absent environment variable ${name}`);
    }
    return value;
}

const config = {
    PORT: process.env.PORT,
    MONGO_URI: checkEnv(process.env.MONGO_URI, "MONGO_URI"),
};

export { config };

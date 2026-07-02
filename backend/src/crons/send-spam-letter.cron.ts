import { CronJob } from "cron";

const handler = async () => {
    try {
        console.log("LETTER CRON TRIGGERED");

    } catch (e: any) {
        console.error(e.message);
    }
};

export const sendSpamLetters = new CronJob("0 0 * * *", handler);

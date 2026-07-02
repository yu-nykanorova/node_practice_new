import { CronJob } from "cron";

import { config } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
    try {
        console.log("CRON TRIGGERED");
        const lifeTime = config.JWT_REFRESH_LIFETIME;
        const { value, unit } = timeHelper.parseLifeTime(lifeTime);
        const date = timeHelper.subFromCurrentTime(value, unit);
        const count = await tokenRepository.deleteBeforeDate(date);

        console.log("TOTAL TOKENS:", count);

        if (count) {
            console.log(`deleted ${count} old tokens`);
        }
    } catch (e: any) {
        console.error(e.message);
    }
};

export const removeOldTokensCron = new CronJob("0 0 * * *", handler);

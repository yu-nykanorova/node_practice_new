import { removeOldTokensCron } from "./remove-old-tokens.cron";
import { sendSpamLetters } from "./send-spam-letter.cron";

export const cronRunner = async () => {
    removeOldTokensCron.start();
    sendSpamLetters.start();
};

import { CronJob } from "cron";

import { emailConstants } from "../constants/email.constants";
import { EmailEnum } from "../enums/email.enum";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
    try {
        console.log("LETTER CRON TRIGGERED");
        const users: IUser[] = await userRepository.getAll({});

        await Promise.all(
            users.map(async (user) => {
                await emailService.sendEmail(
                    user.email,
                    emailConstants[EmailEnum.SPAM_LETTER],
                    { name: user.name },
                );
            }),
        );

        console.log(`${users.length} letters have been sent`);
    } catch (e: any) {
        console.error(e.message);
    }
};

export const sendSpamLetters = new CronJob("0 0 * * *", handler);

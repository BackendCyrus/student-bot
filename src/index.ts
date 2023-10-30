require('dotenv').config();
import puppeteer from "puppeteer";
import { userName, password } from "./config";

async function loginAndJoinMeet(): Promise<void> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://lms.mpnu.ac.ir/Identity/Account/Login');

        // Log in
        await page.type('#Input_UserName', userName);
        await page.type('#password', password);
        const loginButton = (await page.$$('.btn'))[2];
        await loginButton.click();

        await page.waitForSelector('#c-subheader')

        // Go to online class
        await page.goto('https://lms.mpnu.ac.ir/Student/OnlineClass')

        await page.waitForSelector('#c-subheader')

        setTimeout(async () => {
            try {
                const meetings = await page.$$('.d-inline');
                if (meetings.length > 0) {
                    const meetingToClick = meetings[0];
                    await meetingToClick.click();
                }
            } catch (error) {
                console.log('No classes are currently being taken.')
            }
        }, 5000);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await browser.close();
    }
}

async function main(): Promise<void> {
    await loginAndJoinMeet();
    setInterval(loginAndJoinMeet, 900000);
}

main();
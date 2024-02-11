require('dotenv').config();
import puppeteer from 'puppeteer';
import config from './config';

async function loginAndJoinMeet(): Promise<void> {
    // Launch a new headless browser
    const browser = await puppeteer.launch({ headless: true });

    try {
        // Create a new page in the browser
        const page = await browser.newPage();

        // Navigate to the login page
        await page.goto('https://lms.mpnu.ac.ir/Identity/Account/Login');

        // Enter username and password
        await page.type('#Input_UserName', config.username);
        await page.type('#password', config.password);

        // Click the login button
        const loginButton = (await page.$$('.btn'))[2];
        await loginButton.click();

        // Wait for the home page to load
        await page.waitForSelector('#c-subheader');

        // Navigate to the online class page
        await page.goto('https://lms.mpnu.ac.ir/Student/OnlineClass');

        // Wait for the online class page to load
        await page.waitForSelector('#c-subheader');

        // Delay before attempting to click on a class
        setTimeout(async () => {
            try {
                // Get the list of available classes
                const meetings = await page.$$('.d-inline');
                // If there are classes, click the first one
                if (meetings.length > 0) {
                    const meetingToClick = meetings[0];
                    await meetingToClick.click();
                }
            } catch (error) {
                console.log('No classes are currently being taken.');
            }
        }, 5000);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
}

async function main(): Promise<void> {
    // Execute the login and join meet function
    await loginAndJoinMeet();
    // Schedule the login and join meet function to run every 15 minutes
    setInterval(loginAndJoinMeet, 900000);
}

main();
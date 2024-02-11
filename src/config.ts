import dotenv from 'dotenv';

interface IConfig {
    username: string;
    password: string;
}

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const { PN_USERNAME, PN_PASSWORD } = process.env;

if (!PN_USERNAME || !PN_PASSWORD) {
    throw new Error("⚠️  Missing PN_USERNAME or PN_PASSWORD in .env file  ⚠️");
}

const config: IConfig = {
    username: PN_USERNAME,
    password: PN_PASSWORD
};

export default config;
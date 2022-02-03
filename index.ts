import { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import BaseClient from "./src/structures/Bot";

const client = new BaseClient({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.init(process.env.DISCORD_TOKEN!);
export default client;
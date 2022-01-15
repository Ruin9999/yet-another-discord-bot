const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

//Create new bot.
const client = new Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
})

client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map(); //A map of guildIds to their respective music objects;

RegisterEvents();
RegisterCommands();

client.login(process.env.DISCORD_TOKEN);

module.exports = client;

//Register Events
function RegisterEvents() {
    const eventFolders = fs.readdirSync("./src/events");
    for(const folder of eventFolders) {
        const eventFiles = fs.readdirSync(`./src/events/${folder}`);
        for(const file of eventFiles) {
            //Run each event file.
            const event = require(`./events/${folder}/${file}`);
            event.run(client);
        }
    }
}

//Register Commands
function RegisterCommands() {
    const commandFolders = fs.readdirSync("./src/commands");
    for(const folder of commandFolders) {
        const commandFiles  = fs.readdirSync(`./src/commands/${folder}`);
        for(const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
            client.aliases.set(command.alias, command.name);
        }
    }
}
const { Client, Intents, Collection } = require("discord.js");
const { Player } = require("discord-music-player");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
})

client.commands = new Collection();
client.player = new Player(
    client,
    {}
)

//Dynamically register commands
const commandFolders = fs.readdirSync("./commands")
for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`);
    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

//Dynamically register events
const eventFolders = fs.readdirSync("./events");
for(const folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`);
    for(const file of eventFiles) {
        const event = require(`./events/${folder}/${file}`);
        if(folder === "music-player") {
            if(event.once) {
                client.player.once(event.name, (client, interaction, ...args) => event.execute(client, interaction, ...args));
            } else {
                client.player.on(event.name, (client, interaction, ...args) => event.execute(client, interaction, ...args));
            }
        } else {
            if(event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

//Command handler
client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if(!command) {
        await interaction.reply("No such commmand!");
        return;
    }

    try {
        await interaction.deferReply();
        await command.execute(interaction, client);
    } catch (err) {
        console.log(err);
        await interaction.reply({ content: "An error occurred!", ephemeral: true})
    }
});

client.login(process.env.DISCORD_TOKEN);
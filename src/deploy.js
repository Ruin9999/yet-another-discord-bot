//Run this file only when we add or edit slash commands.

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const commands = [];
const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`);
	for(const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
        if(command.isSlash) commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

	rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands })
	.then(() => console.log('Successfully registered guild commands.'))
	.catch(console.error);
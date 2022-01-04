const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { BuildEmbed } = require("../../utils/BuildEmbed");
const fs = require("fs");

module.exports = {
    name: 'help',
    alias: 'help',
    help: 'help `command`',
    description: 'Lists the bot commands',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists the bot commands')
        .addStringOption(option => {
            return option.setName("command")
                .setDescription("Name of the command you want to know more about.");
        }),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        if(args.length > 1) {
            await message.channel.send("Invalid Arguments!");
            return;
        }

        GetBotCommands(message, ...args);
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        GetBotCommands(interaction, interaction.options.getString("command"));
    }
}

async function GetBotCommands(message, args) {

    let embed = new MessageEmbed();
    let commandList = [];

    const command = client.commands.get(args);
    if(command) { //If we can find command.
            commandList.push({
                name : command.name,
                value : command.help
            })
    } else { //If we cannot find command
            const commandFolders = fs.readdirSync("./src/commands");
            for(const folder of commandFolders) {
                const commandFiles  = fs.readdirSync(`./src/commands/${folder}`);
                for(const file of commandFiles) {
                    const command = require(`../${folder}/${file}`);
                    commandList.push({
                        name : command.name,
                        value : command.description
                    })
                }
            }
    }

    embed = BuildEmbed(
        embed,
        {
            fields: commandList,
        }
    )

    try {
            await message.editReply({embeds : [embed]});
        } catch (err) {
            await message.channel.send({embeds : [embed]});
        }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const { BuildEmbed } = require("../../modules/BuildEmbed");
const GetBotCommands = require("../../modules/GetBotCommands");
const config = require("../../../config.json");

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
        let embed = new MessageEmbed();
        let commandList = [];

        switch(args.length) {
            case 1:
                const client = require("../../index.js");
                const command = client.commands.get(args.toString());
                if(!command) {
                    commandList.push({
                        name : `Command not found!`,
                        value : "```" + `Command not found!` + "```"
                    })
                } else {
                    commandList.push({
                        name : `${command.name}`,
                        value : `${command.help}`
                    })
                }
                break;
            default:
                commandList = GetBotCommands();
                break;
        }

        embed = BuildEmbed(
            embed,
            {
                title : `${config.name} commands`,
                fields : commandList
            }
        )

        await message.channel.send({embeds : [embed]});
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        let embed = new MessageEmbed();
        let commandList = [];

        if(interaction.options.getString("command")) {
            const client = require("../../index.js");
            const command = client.commands.get(interaction.options.getString("command"));
            if(!command) {
                commandList.push({
                    name : `Command not found!`,
                    value : "```" + `Command not found!` + "```"
                })
            } else {
                commandList.push({
                    name : `${command.name}`,
                    value : `${command.help}`
                })
            }
        } else {
            commandList = GetBotCommands();
        }

        embed = BuildEmbed(
            embed,
            {
                title : `${config.name} commands`,
                fields : commandList
            }
        )

        await interaction.editReply({embeds : [embed]});
    }
}
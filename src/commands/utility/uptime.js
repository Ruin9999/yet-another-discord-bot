const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { BuildEmbed } = require("../../modules/BuildEmbed");

module.exports = {
    name: 'uptime',
    alias: 'uptime',
    help: '`no arguments`',
    description: 'Gets the bot uptime.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Gets the bot uptime.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        let embed = new MessageEmbed();

        //Change it to seconds
        let seconds = message.client.uptime / 1000;
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        embed = BuildEmbed(
            embed,
            {
                description : `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
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

        //Change it to seconds
        let seconds = message.client.uptime / 1000;
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        embed = BuildEmbed(
            embed,
            {
                description : `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
            }
        )

        await interaction.editReply({embeds: [embed]});
    }
}
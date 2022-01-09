const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { BuildEmbed } = require("../../modules/BuildEmbed");
const config = require(`../../../config.json`);

module.exports = {
    name: 'invite',
    alias: 'inv',
    help: '`no arguments`',
    description: 'Sends the bot invite link',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Sends the bot invite link'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        let embed = new MessageEmbed();
        
        embed = BuildEmbed(
            embed,
            {
                title : "Invite Link",
                description : `${config.inviteLink}`
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

        embed = BuildEmbed(
            embed,
            {
                title : "Invite Link",
                description : `${config.inviteLink}`
            }
        )

        await message.editReply({embeds : [embed]});
    }
}
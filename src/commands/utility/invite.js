const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { BuildEmbed } = require("../../utils/BuildEmbed");
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
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        SendInvite(message);
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        SendInvite(interaction);
    }
}

async function SendInvite(message) {
    let embed = new MessageEmbed();
    embed = BuildEmbed(
        embed,
        {
            title : "Invite Link",
            description : `${config.inviteLink}`
        }
    )

    try {
        await message.editReply({embeds : [embed]});
    } catch (err) {
        await message.channel.send({embeds : [embed]});
    }
}
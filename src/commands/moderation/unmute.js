const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageMentions } = require('discord.js');

const { BuildEmbed } = require("../../modules/BuildEmbed");

module.exports = {
    name: 'unmute',
    alias: 'unmute',
    help: 'unmute `@mention`',
    description: 'Unmutes a member.',
    isSlash: true,
    userPerms: ['MUTE_MEMBERS'],
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmutes a member.')
        .addMentionableOption(option => {
            return option.setName("user")
                .setDescription("User that you want to unmute.")
                .setRequired(true);
        }),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        if(args.length < 1) return message.channel.send("Invalid Arguments!");
        const target = message.mentions.members.first();

        //Check if user was mentioned
        if(!target) return message.channel.send("Please mention a valid user.");

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was unmuted! 🔊`
            }
        )

        //Unmute user
        target.voice.setMute(false);
        await message.channel.send({embeds : [embed]});
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        //No need to check for arguments as slash commands handle that
        const target = interaction.options.getMentionable("user");

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was unmuted! 🔊`
            }
        )

        //Unmute user
        target.voice.setMute(false);
        await interaction.editReply({embeds : [embed]})
    }
}
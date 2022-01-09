const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageMentions } = require('discord.js');

const { BuildEmbed } = require("../../modules/BuildEmbed");

module.exports = {
    name: 'mute',
    alias: 'mute',
    help: 'mute `@mention`',
    description: 'Mutes a member.',
    isSlash: true,
    userPerms: ['MUTE_MEMBERS'],
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a member.').addMentionableOption(option => {
            return option.setName("user")
                .setDescription("User that you want to mute.")
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

        //Check if user is muting someone of higher rank
        if(target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You cannot mute someone who has an equal/higher rank than you!");

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was muted! 🔇`
            }
        )

        //Mute user
        target.voice.setMute(true);
        await message.channel.send({embeds : [embed]})
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        //No need to check for arguments as slash commands handle that
        const target = interaction.options.getMentionable("user");
        
        //Check if user is muting someone of higher rank
        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.editReply("You cannot mute someone who has and equal/higher rank than you!");
        
        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was muted! 🔇`
            }
        )

        //Mute user
        target.voice.setMute(true);
        await interaction.editReply({embeds : [embed]})
    }
}
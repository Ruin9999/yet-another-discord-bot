const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { BuildEmbed } = require("../../modules/BuildEmbed");

module.exports = {
    name: 'kick',
    alias: 'kick',
    help: 'kick `@mention`',
    description: 'Kicks a member.',
    isSlash: true,
    userPerms: ['KICK_MEMBERS'],
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member.')
        .addMentionableOption(option => {
            return option.setName("user")
                .setDescription("User that you want to kick.")
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

        //Check if user is kicking himself
        if(target === message.member) return message.channel.send("You cannot kick yourself!");

        //Check if user is kicking someone of higher rank
        if(target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You cannot kick someone who has an equal/higher rank than you!");

        //Check if user is kickable
        if(!target.kickable) return message.channel.send(`${target.user.username} is not kickable.`);
    
        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was kicked! 👢`
            }
        )

        //Kick user
        target.kick();
        await message.channel.send({embeds : [embed]});
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        //No need to check for arguments as slash commands handle that
        const target = interaction.options.getMentionable("user");

        //Check if user is kicking himself
        if(target === interaction.member) return interaction.editReply("You cannot kick yourself!");

        console.log(target);
        //Check if user is kicking someone of higher rank
        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.editReply("You cannot kick someone who has and equal/higher rank than you!");

        //Check if user is kickable
        if(!target.kickable) return interaction.editReply(`${target.user.username} is not kickable.`);

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was kicked! 👢`
            }
        )

        target.kick();
        await interaction.editReply({embeds : [embed]});
    }
}
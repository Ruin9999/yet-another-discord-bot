const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageMentions } = require('discord.js');

const { BuildEmbed } = require("../../modules/BuildEmbed");

module.exports = {
    name: 'ban',
    alias: 'ban',
    help: 'ban `@mention`',
    description: 'Bans a member.',
    isSlash: true,
    userPerms: ['BAN_MEMBERS'],
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member.')
        .addMentionableOption(option => {
            return option.setName("user")
                .setDescription("User that you want to ban.")
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

        //Check if user is banning yourself
        if(target === message.member) return message.channel.send("You cannot ban yourself!");

        //Check if user is banning someone of higher rank
        if(target.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You cannot ban someone who has an equal/higher rank than you!");
        
        //Check if use is bannable
        if(!target.bannable) return message.channel.send(`${target.user.username} is not bannable.`);

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was banned! 🔨`
            }
        )

        //Ban user
        target.ban();
        await message.channel.send({embeds : [embed]})
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        //No need to check for arguments as slash commands handle that
        const target = interaction.options.getMentionable("user");

        //Check if user is banning himself
        if(target === interaction.member) return interaction.editReply("You cannot ban yourself!");

        console.log(target);
        //Check if user is banning someone of higher rank
        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.editReply("You cannot ban someone who has and equal/higher rank than you!");

        //Check if user is bannable
        if(!target.bannable) return interaction.editReply(`${target.user.username} is no bannable.`);

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${target.user.username} was banned! 🔨`
            }
        )

        target.ban();
        await interaction.editReply({embeds : [embed]});
    }
}
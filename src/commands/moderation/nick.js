const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageMentions } = require('discord.js');

const { BuildEmbed } = require("../../modules/BuildEmbed");

module.exports = {
    name: 'nick',
    alias: 'nick',
    help: 'nick `@mention` `nickname`',
    description: 'Change the nickname of a user.',
    isSlash: true,
    userPerms:  ['CHANGE_NICKNAME', 'MANAGE_NICKNAMES'],
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Change the nickname of a user.')
        .addMentionableOption(option => {
            return option.setName("user")
                .setDescription("User to nickname.")
                .setRequired(true);
        })
        .addStringOption(option => {
            return option.setName("nickname")
                .setDescription("Nickname to change to.");
        }),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        if(args.length < 1) return message.channel.send("Invalid Arguments!");
        const target = message.mentions.members.first();

        let nickname;
        if(args.length > 1) {
            nickname = args.shift();
            nickname = args.join(" ");
            if(nickname.length > 32) return message.channel.send("Nickname is too long!");
        } else {
            nickname = null;
        }

        //Check if user was mentioned
        if(!target) return message.channel.send("Please mention a valid user.");

        //Check if user is nicking someone of higher rank
        if(target.roles.highest.position > message.member.roles.highest.position) return message.channel.send("You cannot nick someone who has a higher rank than you!");

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `**${target.user.username}'s** name was changed to **${nickname}!**`
            }
        )

        //Nick user
        try {
            target.setNickname(nickname);
            await message.channel.send({embeds : [embed]});
        } catch (err) {
            console.log(err);
        }
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        const target = interaction.options.getMentionable("user");
        let nickname = interaction.options.getString("nickname");

        if(!nickname) {
            nickname = null;
        } else {
            if(nickname.length > 32) return message.channel.send("Nickname is too long!");
        }

        if(target.roles.highest.position > interaction.member.roles.highest.position) return interaction.editReply("You cannot nick someone who has a higher rank than you!");

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `**${target.user.username}'s** name was changed to **${nickname}!**`
            }
        )

        //Nick user
        try {
            target.setNickname(nickname);
            await interaction.editReply({embeds : [embed]});
        } catch (err) {
            console.log(err);
        }
    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const { BuildEmbed } = require("../../modules/BuildEmbed");

module.exports = {
    name: 'undeafen',
    alias: 'undeafen',
    help: 'undeafen `@mention`',
    description: 'Undeafens a member.',
    isSlash: true,
    userPerms : ['DEAFEN_MEMBERS'],
    data: new SlashCommandBuilder()
        .setName('undeafen')
        .setDescription('Undeafens a member.')
        .addMentionableOption(option => {
            return option.setName("user")
                .setDescription("User that you want undeafened.")
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
                description : `${target.user.username} was undeafened! 🎧`
            }
        )

        //Undeafen user
        target.voice.setDeaf(false);
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
                description : `${target.user.username} was undeafened! 🎧`
            }
        )

        //Undeafen user
        target.voice.setDeaf(false);
        await interaction.editReply({embeds : [embed]});
    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageMentions, Guild } = require('discord.js');

const { BuildEmbed } = require("../../modules/BuildEmbed");
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    name: 'unban',
    alias: 'unban',
    help: 'unban `userid`',
    description: 'Unbans a member.',
    isSlash: true,
    userPerms: ['BAN_MEMBERS'],
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a member.')
        .addStringOption(option => {
            return option.setName("userid")
                .setDescription("ID of the user you want unbanned.")
                .setRequired(true);
        }),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        if(args.length < 1) return message.channel.send("Invalid Arguments!");
        const targetId = args;

        //Test if string is valid
        if(!rgx.test(targetId.toString())) return message.channel.send("Please enter a valid user ID.");       

        //Check if user is banned
        const bannedUsers = await message.guild.bans.fetch();
        const user = bannedUsers.find(ban => ban.user.id == targetId);
        if(!user) {
            return message.channel.send("Unable to find banned user.");
        }

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${targetId} was unbanned! 🔨`
            }
        )

        //Unban targetId
        await message.guild.members.unban(targetId.toString());
        await message.channel.send({embeds : [embed]});
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        const targetId = interaction.options.getString("userid");
        if(!rgx.test(targetId.toString())) return message.channel.send("Please enter a valid user ID.");       
        
        //Test if string is valid
        if(!rgx.test(targetId.toString())) return message.channel.send("Please enter a valid user ID.");       

        //Check if user is banned
        const bannedUsers = await message.guild.bans.fetch();
        const user = bannedUsers.find(ban => ban.user.id == targetId);
        if(!user) {
            return message.channel.send("Unable to find banned user.");
        }

        const embed = BuildEmbed(
            new MessageEmbed,
            {
                description : `${targetId} was unbanned! 🔨`
            }
        )

        //Unban targetId
        await interaction.guild.members.unban(targetId.toString());
        await interaction.editReply({embeds : [embed]});
    }
}
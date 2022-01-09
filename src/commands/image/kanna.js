const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const { BuildEmbed } = require("../../modules/BuildEmbed");
const { GetImage } = require("../../modules/GetNekoImage");

module.exports = {
    name: 'kanna',
    alias: 'kanna',
    help: 'kanna',
    description: 'Gets an image.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('kanna')
        .setDescription('Gets an image.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        let embed = new MessageEmbed();
        
        //Send waiting message
        const waitingMsg = await message.channel.send({content : "Fetching image...", ephemeral: true});

        //Try and get image
        const res = await GetImage({type : "kanna"});
        embed = BuildEmbed(
            embed,
            {
                image : res.data.message
            }
        )

        //Delete waiting message and send image
        waitingMsg.delete();
        await message.channel.send({embeds : [embed]});
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        let embed = new MessageEmbed();
        
        const res = await GetImage({type : "kanna"});
        embed = BuildEmbed(
            embed,
            {
                image : res.data.message
            }
        )

        await interaction.editReply({embeds : [embed]});
    }
}
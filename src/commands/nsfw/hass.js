const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

const { BuildEmbed } = require("../../modules/BuildEmbed");
const { GetImage } = require("../../modules/GetNekoImage");

module.exports = {
    name: 'hass',
    alias: 'hass',
    help: 'hass',
    description: 'Gets an image. [NSFW]',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('hass')
        .setDescription('Gets an image. [NSFW]'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        let embed = new MessageEmbed();

        //Delete request message and send waiting message
        message.delete();
        const waitingMsg = await message.channel.send({content : "Fetching image...", ephemeral: true});

        //Try and get image
        const res = await GetImage({type : "hass"});
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

        const res = await GetImage({type : "hass"});
        embed = BuildEmbed(
            embed,
            {
                image : res.data.message
            }
        )

        await interaction.editReply({embeds : [embed]});
    }
}
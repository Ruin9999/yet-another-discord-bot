const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");

const { BuildEmbed } = require("../../modules/BuildEmbed");
const { play } = require("../../modules/MusicManager");

module.exports = {
    name: 'play',
    alias: 'p',
    help: 'play `url`',
    description: 'Plays a track.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a track.')
        .addStringOption(option => {
            return option.setName("url")
                .setDescription("Audio url.")
                .setRequired(true);
        }),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {

        //Check if user gave url
        if(args.length < 1) return message.channel.send("Invalid Arguments!");

        //Check if user is in vc
        const { channel } = message.member.voice;
        if(!channel) return message.channel.send("You need to be in a voice channel first!");

        //Play song
        const songInfo = await play(message, args);

        await message.channel.send(`🎵 Added **${songInfo.videoDetails.title}** to the queue.`);
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {

        //Check if user is in vc
        const channel = interaction.member.voice.channel.id;
        if(!channel) return interaction.channel.send("You need to be in a voice channel first!");
        
        //Play song
        const songInfo = await play(interaction, interaction.options.getString("url"));

        await interaction.editReply(`🎵 Now playing **${songInfo.videoDetails.title}**`);
    }
}
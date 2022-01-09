const { SlashCommandBuilder } = require('@discordjs/builders');
const { leave } = require("../../modules/MusicManager");

module.exports = {
    name: 'stop',
    alias: 'stop',
    help: 'stop',
    description: 'Stops playing a track.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops playing a track.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        
        //Stop playing audio
        leave(message);
        await message.channel.send("🚫 Stopped playing...");
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        
        //Stop playing audio
        leave(interaction);
        await interaction.editReply("🚫 Stopped playing...");
    }
}
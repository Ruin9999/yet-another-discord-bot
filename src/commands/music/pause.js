const { SlashCommandBuilder } = require('@discordjs/builders');
const { pause } = require("../../modules/MusicManager");

module.exports = {
    name: 'pause',
    alias: 'pause',
    help: 'pause',
    description: 'Pauses playing audio.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses playing audio.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        
        //Pause playing audio
        pause(message);
        await message.channel.send("⏸ Paused");
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {

        //Pause playing audio
        pause(interaction);
        await interaction.editReply("⏸ Paused");
    }
}
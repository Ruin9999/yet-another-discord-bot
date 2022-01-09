const { SlashCommandBuilder } = require('@discordjs/builders');
const { skip } = require("../../modules/MusicManager");

module.exports = {
    name: 'skip',
    alias: 'skip',
    help: 'skip',
    description: 'Skips to the next audio track.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips to the next audio track.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        
        //Skips to the next audio track
        const skipped = skip(message);

        if(skipped) {
            await message.channel.send("Skipped...");
        } else {
            await message.channel.send("There is nothing to skip!");
        }
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {

        //Skips to the next audio track
        const skipped = skip(interaction);
        if(skipped) {
            await interaction.editReply("Skipped...");
        } else {
            await interaction.editReply("There is nothing to skip!");
        }
    }
}
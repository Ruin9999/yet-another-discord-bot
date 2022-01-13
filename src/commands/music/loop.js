const { SlashCommandBuilder } = require('@discordjs/builders');
const { loop } = require("../../modules/MusicManager");

module.exports = {
    name: 'loop',
    alias: 'loop',
    help: 'loop',
    description: 'Toggles between looping audio tracks.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Toggles between looping audio tracks.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        
        await loop(message);

        await message.channel.send(message.client.queue.get(message.guild.id).loop ? "🔁 Looping..." : "🛑 Stopped Looping...")
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        await loop(interaction);
        
        await interaction.editReply(interaction.client.queue.get(interaction.guild.id).loop ? "🔁 Looping..." : "🛑 Stopped Looping...");
    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'ping',
    alias: 'ping',
    help: 'ping',
    description: 'Replies with Pong!',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        await message.channel.send("Pong!");
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        await interaction.editReply("Pong!");
    }
}
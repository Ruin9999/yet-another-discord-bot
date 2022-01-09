const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'getping',
    alias: 'getping',
    help: '`no arguments`',
    description: 'Gets the bot ping.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('getping')
        .setDescription('Gets the got ping.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        const sent = await message.channel.send({content : "Pinging...", fetchReply : true});
        await message.channel.send("Bot Latency:```" + `${sent.createdTimestamp - message.createdTimestamp}` + "ms```");
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        const sent = await interaction.editReply({content : "Pinging...", fetchReply : true});
        await interaction.editReply("Bot Latency:```" + `${sent.createdTimestamp - interaction.createdTimestamp}` + "ms```");
    }
}
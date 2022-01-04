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
        await ReplyWithPong(message);
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        await ReplyWithPong(interaction);
    }
}


async function ReplyWithPong(message) {
    try {
        await message.editReply("Pong!");
    } catch (err) {
        await message.channel.send("Pong!");
    }
}
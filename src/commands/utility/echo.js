const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'echo',
    alias: 'echo',
    help: '`no arguments`',
    description: 'Says something in chat.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Says something in chat.')
        .addStringOption(option => {
            return option.setName("text")
                .setDescription("text you want the bot to say")
                .setRequired(true);
        }),

    /**
     * Function for recieving message
     * @param {client} client The instanciating client
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        if(args.length < 1) {
            await message.channel.send("You need to type some text!");
            return;
        }
        
        const msg = args.toString().replaceAll(",", " ");
        await message.channel.send(msg);
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        const msg = interaction.options.getString("text");
        await interaction.editReply(msg);
    }
}
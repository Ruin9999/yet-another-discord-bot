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
        
        Echo(message, args);
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {
        Echo(interaction, interaction.options.getString("text"));
    }
}

async function Echo(message, ...args) {
    const msg = args.toString().replaceAll(",", " ");
    try {
        await message.editReply(msg);
    } catch (err) {
        await message.channel.send(msg);
    }
}
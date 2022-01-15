const { SlashCommandBuilder } = require('@discordjs/builders');
const { resume } = require("../../modules/MusicManager");

module.exports = {
    name: 'resume',
    alias: 'resume',
    help: 'resume',
    description: 'Resumes playing audio.',
    isSlash: true,
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes playing audio.'),

    /**
     * Function for recieving message
     * @param {message} message The instanciating message
     * @param {args} args The args that were sent with the message
     */
    async run(message, ...args) {
        
        //Resumes playing audio
        const res = resume(message);
        if(!res) {
            return message.channel.send("There is nothing playing!");
        }
        await message.channel.send(`▶️ Resumed playing...`);
    },

    /**
     * Function for recieving interaction
     * @param {interaction} interaction The interaction that ran the command
     */
    async execute(interaction) {

        //Resumes playing audio
        const res = resume(interaction);
        if(!res) {
            return interaction.editReply("There is nothing playing!");
        }
        await interaction.editReply(`▶️ Resumed playing...`);
    }
}
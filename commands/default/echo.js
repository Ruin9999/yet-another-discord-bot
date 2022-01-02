const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Says something in chat.")
        .addStringOption(option => {
            return option.setName("message")
                .setDescription("Enter a message")
        }),
    async execute(interaction) {
        const message = interaction.options.getString("message");
        await interaction.channel.send(message);
        await interaction.editReply({ content: "Yes sir", ephemeral: true})
    }
}
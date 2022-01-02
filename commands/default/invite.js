const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Send the bot invite link."),
    async execute(interaction) {
        await interaction.user.send(config.InviteLink || "There is no invite link");
        await interaction.editReply("Sent you the link!");
    } 
}
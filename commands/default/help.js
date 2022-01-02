const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Lists bot commands."),

    async execute(interaction) {
        const rowCount = 0, rowMax = 3;
        const commands = []
        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        for(const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if(rowCount % rowMax) { //If the number of items a row has reached 3
                commands.push({
                    name: command.data.name,
                    value:  command.data.description
                });
            } else {
                commands.push({
                    name: command.data.name,
                    value:  command.data.description,
                    inline: true
                });
            }
        }

        const embed = new MessageEmbed()
        .setColor(config.Theme)
        .setTitle("Grogger Help")
        .setDescription("A complete list of bot commands")
        .addFields(commands)
        .setTimestamp()
        .setFooter("Bot by Ruin9999#9181")

        await interaction.editReply({ embeds: [embed] })
    }
}
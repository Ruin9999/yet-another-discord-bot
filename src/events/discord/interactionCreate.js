module.exports = {
    async run(client) {
        client.on("interactionCreate", async (interaction) => {
            if(!interaction.isCommand()) return;
            await interaction.deferReply();
        
            //Get command
            let cmd = client.commands.get(interaction.commandName);
            if(!cmd) cmd = client.commands.get(client.alises.get(interaction.commandName));
            if(!cmd) await interaction.editReply("No such command!");
            else await cmd.execute(interaction);
        })
    }
}
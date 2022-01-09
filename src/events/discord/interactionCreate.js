module.exports = {
    async run(client) {
        client.on("interactionCreate", async (interaction) => {
            if(!interaction.isCommand()) return;
            await interaction.deferReply();
        
            //Get command
            let cmd = client.commands.get(interaction.commandName);

            if(!interaction.member.permissions.has(cmd.userPerms || [])) return message.channel.send("You don't have enough permissions!");
            
            //There is no reason to check if the command is valid as only valid ones will be allowed through slash commands.
            await cmd.execute(interaction);
        })
    }
}
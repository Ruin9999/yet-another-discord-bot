const config = require("../../../config.json");

module.exports = {
    async run(client) {
        client.on("messageCreate", async (message) => {
            if(message.author.bot || !message.content.startsWith(config.prefix)) return;
        
            const msg = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const cmdName = msg.shift();
            const args = msg;
        
            //Get command
            let command = client.commands.get(cmdName);
            if(!command) {
                const alias = client.commands.get(cmdName);
                if(!alias) {
                    await message.channel.send("No such command!");
                    return;
                } else {
                    command = client.commands.get(alias);
                }
            }

            if(!message.member.permissions.has(command.userPerms || [])) return message.channel.send("You don't have enough permissions!");

            await command.run(message, ...args);
        })
    }
}
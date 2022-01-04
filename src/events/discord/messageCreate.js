const config = require("../../../config.json");

module.exports = {
    run(client) {
        client.on("messageCreate", async (message) => {
            if(message.author.bot || !message.content.startsWith(config.prefix)) return;
        
            const msg = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const cmdName = msg.shift();
            const args = msg;
        
            //Get command
            let cmd = client.commands.get(cmdName);
            if(!cmd) cmd = client.commands.get(client.aliases.get(cmdName));
            if(!cmd) await message.channel.send("No such command!")
            else await cmd.run(message, ...args);
        })
    }
}
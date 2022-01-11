const fs = require("fs");

/**
 * Function that looks for commands
 * @returns A list of command objects
 */
module.exports = function GetBotCommands() {
    let commandList = [];

    const commandFolders = fs.readdirSync("./src/commands");
    for(const folder of commandFolders) {

        //Hide NSFW commands in the help menu
        if(folder == "nsfw") continue;

        const commandFiles  = fs.readdirSync(`./src/commands/${folder}`);
        for(const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            commandList.push({
                name : command.name,
                value : `${command.description}`,
                inline : true,
            })
        }
    }

    return commandList;
}
import ICommand from "../interfaces/ICommand";

const command: ICommand = {
    name: "help",
    alias: "h",
    description: "Show help for a command",
    usage: "help <command>",
    arguments: [{
        name: "command",
        type: "STRING",
        description: "The command to show help for",
        required: true,
    }],
    ephemeral: false,
    isSlash: true,
    userPermissions: [],
    botPermissions: [],
    async run(message) {

    },
    callback(interaction) {
        
    }
}

export default command;
import ICommand from "../interfaces/ICommand";

const command: ICommand = {
    name: "ping",
    alias: "p",
    description: "Ping the bot",
    usage: "ping",
    ephemeral: false,
    isSlash: true,
    userPermissions: [],
    botPermissions: [],
    async run(message) {
        return "Pong!";
    },
    callback(interaction) {
        return "Pong!";
    }
}
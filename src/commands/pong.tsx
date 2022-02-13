import ICommand from "../interfaces/ICommand";

const command: ICommand = {
    name: "pong",
    alias: "pong",
    description: "Ping the bot",
    usage: "pong",
    ephemeral: false,
    isSlash: true,
    userPermissions: [],
    botPermissions: [],
    async run(message) {
        return "Ping!";
    },
    callback(interaction) {
        return "Ping!";
    }
}
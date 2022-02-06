import ICommand from "../interfaces/ICommand";

const command: ICommand = {
    name: "echo",
    alias: "e",
    description: "Echo the message",
    usage: "echo <message>",
    arguments: [{
        name: "message",
        type: "STRING",
        description: "The message to echo",
        required: true,
    }],
    ephemeral: false,
    isSlash: true,
    userPermissions: [],
    botPermissions: [],
    async run(message) {
        return message.content;
    },
    callback(interaction) {
        return interaction.options.getString("message")!;
    }
}
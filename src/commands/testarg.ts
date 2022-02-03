import { CommandInteraction, Message, ApplicationCommandOptionType } from "discord.js";
import ICommand from "../interfaces/ICommand";

const command : ICommand = {
    name: "testarg",
    alias: "testarg",
    usage: "testarg",
    arguments: [{
        name: "arg",
        type: "STRING",
        description: "The argument to test",
    }],
    description: "testarg",
    isSlash: true,
    ephemeral: true,
    botPermissions: [],
    userPermissions: [],
    run(message : Message) {
        console.log("test");
    },
    callback(interaction: CommandInteraction) {
        console.log(interaction.options.getString("arg"));
    }
}

export default command;
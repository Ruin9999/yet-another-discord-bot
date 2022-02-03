import { CommandInteraction, Message } from "discord.js";
import ICommand from "../interfaces/ICommand";

const command : ICommand = {
    name: "test",
    alias: "test",
    usage: "test",
    description: "test",
    isSlash: true,
    ephemeral: true,
    botPermissions: [],
    userPermissions: [],
    run(message : Message) {
        console.log("test");
    },
    callback(interaction: CommandInteraction) {
        
    }
}

export default command;
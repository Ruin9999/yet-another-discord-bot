import { Interaction, Message } from "discord.js";
import ICommand from "../interfaces/ICommand";

const command : ICommand = {
    name : "ping",
    alias : "pong",
    description: "Gets the bot's ping",
    usage: "ping",
    ephemeral: false,
    isSlash: true,
    userPermissions: [],
    botPermissions: [],
    run: async (message : Message) => {
        
    },
    callback: async (interaction : Interaction) => {

    }
}
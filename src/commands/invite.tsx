import ICommand from "../interfaces/ICommand";
import { config } from "../../config";

const command: ICommand = {
    name: "invite",
    alias: "inv",
    usage: "invite",
    description: "Invite me to your server!",
    isSlash: true,
    ephemeral: true,
    botPermissions: [],
    userPermissions: [],
    run(message) {
        return config.invite;
    },
    callback(interaction) {
        return config.invite;
    }
}

export default command;
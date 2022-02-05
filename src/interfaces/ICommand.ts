import { ApplicationCommandOptionData, Message, CommandInteraction } from "discord.js";

interface IRun {
    (message: Message) : Object | void | string
}

interface ICallback {
    (interaction: CommandInteraction) : Object | void | string
}

export default interface ICommand {
    name : string;
    alias: string;
    description : string;
    arguments?: Array<ApplicationCommandOptionData>;
    usage : string;
    ephemeral : boolean;
    isSlash : boolean;
    userPermissions : string[];
    botPermissions : string[];
    run: IRun;
    callback: ICallback;
} 
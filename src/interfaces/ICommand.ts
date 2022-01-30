import { ApplicationCommandOptionData, Message, Interaction } from "discord.js";

interface IRun {
    (message: Message): string | Object;
}

interface ICallback {
    (interaction: Interaction): string | Object;
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
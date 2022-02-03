import IEvent from "../interfaces/IEvent";
import ICommand from "../interfaces/ICommand";
import { InteractionDeferReplyOptions } from "discord.js";

/**
 * Command handler for interactions
 */
const event : IEvent = {
    name: "interactionCreate",
    once: false,
    async run(interaction) {
        if(!interaction.isCommand()) return;
        
        //Check if command exists
        const command : ICommand | undefined = interaction.client.getCommand(interaction.commandName);
        if(!command) return interaction.reply("Command does not exist!");
        
        //Check if user has enough permissions
        if(!interaction.member.permissions.has(command.userPermissions)) return interaction.reply("You do not have enough permissions");

        //Check if bot has enough permissions
        if(!interaction.memberPermissions.has(command.botPermissions)) return interaction.reply("I do not have enough permissions to do that");

        //Send waiting reply
        let options : InteractionDeferReplyOptions = {};
        if(command.ephemeral) { 
            options.ephemeral = true;
        }
        await interaction.deferReply(options);

        //Run command
        let reply = await command.callback(interaction);
        if(reply) {
            if(command.ephemeral) {
                interaction.editReply(reply, { ephemeral: true });
            } else {
                interaction.editReply(reply);
            }
        }
    }
}

export default event;
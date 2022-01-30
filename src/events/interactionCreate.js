"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Command handler for interactions
 */
const event = {
    name: "interactionCreate",
    once: false,
    run(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand())
                return;
            //Check if command exists
            const command = interaction.client.getCommand(interaction.commandName);
            if (!command)
                return interaction.reply("Command does not exist!");
            //Check if user has enough permissions
            if (!interaction.member.permissions.has(command.userPermissions))
                return interaction.reply("You do not have enough permissions");
            //Check if bot has enough permissions
            if (!interaction.memberPermissions.has(command.botPermissions))
                return interaction.reply("I do not have enough permissions to do that");
            //Send waiting reply
            let options = {};
            if (command.ephemeral) {
                options.ephemeral = true;
            }
            yield interaction.deferReply(options);
            //Run command
            let reply = yield command.callback(interaction);
            if (reply) {
                if (command.ephemeral) {
                    interaction.reply(reply, { ephemeral: true });
                }
                else {
                    interaction.reply(reply);
                }
            }
        });
    }
};
exports.default = event;

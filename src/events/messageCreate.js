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
const config_1 = require("../../config");
const event = {
    name: "messageCreate",
    once: false,
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if message starts with prefix
            if (message.author.bot || !message.content.startsWith(config_1.config.prefix))
                return;
            //Get command name from message;
            const args = message.content.slice(config_1.config.prefix.length).trim().split(/ +/g);
            const cmdName = args.shift();
            //Check if command exists
            const command = message.client.getCommand(cmdName);
            if (!command)
                return message.channel.send("Command does not exist!");
            //Check if user has enough permissions
            if (!message.member.permissions.has(command.userPermissions))
                return message.channel.send("You do not have enough permissions");
            //Check if bot has enough permissions
            if (!message.guild.me.permissions.has(command.botPermissions))
                return message.channel.send("I do not have enough permissions for that!");
            let reply = yield command.run(message);
            if (reply)
                message.channel.send(reply);
        });
    }
};
exports.default = event;

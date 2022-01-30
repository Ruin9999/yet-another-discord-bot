import IEvent from "../interfaces/IEvent";
import {config} from "../../config";

const event : IEvent = {
    name: "messageCreate",
    once: false,
    async run(message) {
        //Check if message starts with prefix
        if(message.author.bot || !message.content.startsWith(config.prefix)) return;
        
        //Get command name from message;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const cmdName = args.shift();

        //Check if command exists
        const command = message.client.getCommand(cmdName);
        if(!command) return message.channel.send("Command does not exist!");

        //Check if user has enough permissions
        if(!message.member.permissions.has(command.userPermissions)) return message.channel.send("You do not have enough permissions");

        //Check if bot has enough permissions
        if(!message.guild.me.permissions.has(command.botPermissions)) return message.channel.send("I do not have enough permissions for that!");

        let reply = await command.run(message);
        if(reply) message.channel.send(reply);
    }
}

export default event;
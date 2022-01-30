"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Class to deploy slash commands to Discord
class Deployer {
    constructor(client, guildId) {
        this.client = client;
        this.guildId = guildId;
    }
    //Deploy to either a specific guild or all guilds depending on the guildId
    deploy() {
        var _a, _b;
        let handler;
        if (!this.guildId || process.env.production)
            handler = (_a = this.client.application) === null || _a === void 0 ? void 0 : _a.commands;
        else
            handler = (_b = this.client.guilds.cache.get(this.guildId)) === null || _b === void 0 ? void 0 : _b.commands;
        const commands = this.client.getCommands();
        for (const command of commands.values()) {
            handler === null || handler === void 0 ? void 0 : handler.create({
                name: command.name,
                description: command.description,
                options: command.arguments,
            });
        }
    }
}
exports.default = Deployer;

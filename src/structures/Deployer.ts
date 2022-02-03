import BaseClient from "./Bot";

//Class to deploy slash commands to Discord
class Deployer {
    private client : BaseClient;
    private guildId : string | undefined;

    constructor(client : BaseClient, guildId? : string) {
        this.client = client;
        this.guildId = guildId;
    }

    //Deploy to either a specific guild or all guilds depending on the guildId
    public deploy() {
        let handler;

        if(!this.guildId || process.env.production) handler = this.client.application?.commands;
        else handler = this.client.guilds.cache.get(this.guildId)?.commands;
        
        const commands = this.client.getCommands();
        for(const command of commands.values()) {
            handler?.create({
                name : command.name,
                description : command.description,
                options : command.arguments,
            })
        }
    }
}

export default Deployer;
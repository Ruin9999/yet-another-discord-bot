import { Client, ClientOptions, Collection } from "discord.js";
import path from "path";
import fs from "fs";
import ICommand from "../interfaces/ICommand";

class BaseClient extends Client {

    private commands : Collection<string, ICommand> = new Collection();
    private aliases : Collection<string, string> = new Collection();

    public constructor(options : ClientOptions) {
        super(options);
    }

    //Initialize the client
    public init(token : string) {
        this.registerCommands();
        this.registerEvents();
        this.login(token);
    }

    //Return a command if it exists
    public getCommand(name : string) : ICommand | undefined{
        const command = this.commands.get(name);
        if(command) return command;
        const alias = this.aliases.get(name);
        if(alias) return this.commands.get(alias);
        return undefined;
    }

    //Get a pointer to the client commands collection
    public getCommands() : Collection<string, ICommand> {
        return this.commands;
    }

    //Register commands
    private registerCommands() {
        const files = this.getFilesRecursive("./src/commands");
        for(const file of files) {
            const command = require("../../" + file).default;
            this.commands.set(command.name, command);
            this.aliases.set(command.alias, command.name);
        }
    }

    //Register events
    private registerEvents() {
        const files = this.getFilesRecursive("./src/events");
        for (const file of files) {
            const event = require("../../"+ file).default;
            if(event.once) {
                this.once(event.name, event.run);
            } else {
                this.on(event.name, event.run);
            }
        }
    }

    //Recursively get files from a directory
    private getFilesRecursive(dir : string) {
        const files = fs.readdirSync(dir);
        const filesList : string[] = [];
        for (const file of files) {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                filesList.push(...this.getFilesRecursive(filePath));
            } else {
                filesList.push(filePath);
            }
        }
        return filesList;
    }
}

export default BaseClient;
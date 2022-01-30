"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class BaseClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
    }
    //Initialize the client
    init(token) {
        this.registerCommands();
        this.registerEvents();
        this.login(token);
    }
    //Return a command if it exists
    getCommand(name) {
        const command = this.commands.get(name);
        if (command)
            return command;
        const alias = this.aliases.get(name);
        if (alias)
            return this.commands.get(alias);
        return undefined;
    }
    //Get a pointer to the client commands collection
    getCommands() {
        return this.commands;
    }
    //Register commands
    registerCommands() {
        const files = this.getFilesRecursive("./src/commands");
        for (const file of files) {
            const command = require("../../" + file).default;
            this.commands.set(command.name, command);
            this.aliases.set(command.alias, command.name);
        }
    }
    //Register events
    registerEvents() {
        const files = this.getFilesRecursive("./src/events");
        for (const file of files) {
            const event = require("../../" + file).default;
            if (event.once) {
                this.once(event.name, event.run);
            }
            else {
                this.on(event.name, event.run);
            }
        }
    }
    //Recursively get files from a directory
    getFilesRecursive(dir) {
        const files = fs_1.default.readdirSync(dir);
        const filesList = [];
        for (const file of files) {
            const filePath = path_1.default.join(dir, file);
            if (fs_1.default.statSync(filePath).isDirectory()) {
                filesList.push(...this.getFilesRecursive(filePath));
            }
            else {
                filesList.push(filePath);
            }
        }
        return filesList;
    }
}
exports.default = BaseClient;

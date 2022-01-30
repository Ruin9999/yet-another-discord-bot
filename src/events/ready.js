"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deployer_1 = __importDefault(require("../structures/Deployer"));
const index_1 = __importDefault(require("../../index"));
const event = {
    name: "ready",
    once: false,
    run() {
        const deployer = new Deployer_1.default(index_1.default, process.env.GUILD_ID);
        deployer.deploy();
        console.log("Bot is ready!");
    }
};
exports.default = event;

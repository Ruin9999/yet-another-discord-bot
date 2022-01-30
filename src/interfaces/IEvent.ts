import { ClientEvents } from "discord.js";

interface IRun {
    (args : any) : void;    
}

export default interface IEvent {
    name: string;
    once: Boolean;
    run : IRun;
}
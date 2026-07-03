import { ClientEvents, Events } from "discord.js"

export type MyEventKey = keyof ClientEvents;

export type MyEventParams<E extends MyEventKey> =
E extends MyEventKey ? ClientEvents[E] : any[];

export type MyEventData<E extends MyEventKey> = {
    name: E | (string & {}),
    once?: boolean
}

export interface IMyEvent<E extends MyEventKey> {
    settings: MyEventData<E>;
    execute(...params: MyEventParams<E>): Promise<void>;
}
/* ^ Events ^ */
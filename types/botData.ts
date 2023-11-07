import { Collection } from 'discord.js';

export interface BotData {
    mode: string;
    commands: Collection<string, any>;
    prevMemberChannels: Map<string, string>;
    defaultChannelId: string;
    muteDeafenChannelId: string;
}
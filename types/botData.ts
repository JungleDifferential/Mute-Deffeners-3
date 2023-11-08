import { Collection } from 'discord.js';
import { AudioPlayer } from '@discordjs/voice';

export interface BotData {
    mode: string;
    commands: Collection<string, any>;
    prevMemberChannels: Map<string, string>;
    defaultChannelId: string;
    muteDeafenChannelId: string;
    player: AudioPlayer;
    currentChannel: string | null;
}
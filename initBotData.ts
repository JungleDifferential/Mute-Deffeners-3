import { BotData } from './types/botData';
import { Collection } from 'discord.js';
import path from 'node:path';

const { defaultChannelId, muteDeafenChannelId } = require(path.resolve(__dirname, '../config.json'));

const botData: BotData = {
	mode: "off",
	commands: new Collection(),
	prevMemberChannels: new Map(),
	defaultChannelId: defaultChannelId,
	muteDeafenChannelId: muteDeafenChannelId,
};
export { botData };
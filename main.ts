import { BotData } from "./types/botData";
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { generateDependencyReport } from '@discordjs/voice';
import fs from 'node:fs';
import path from 'node:path';

/* this is needed because when the .ts files are transpiled into .js files
   the rel path to config.json is different, since the .js files are moved elsehwere
   this will generate an absolute path to config.json */
const { token, defaultChannelId, muteDeafenChannelId } = require(path.resolve(__dirname, '../config.json'));

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const botData: BotData = {
	mode: "off",
	commands: new Collection(),
	prevMemberChannels: new Map(),
	defaultChannelId: defaultChannelId,
	muteDeafenChannelId: muteDeafenChannelId,
};
export { botData };

if (process.argv.length > 1) {
	const arg: string = process.argv.slice(2)[0];
	if (arg == 'mute' || arg == 'deafen') {
		botData.mode = arg
	}
}
console.log(`Mode is set to ${botData.mode}`);

console.log(generateDependencyReport());

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		botData.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args: any) => event.execute(...args));
	} else {
		client.on(event.name, (...args: any) => event.execute(...args));
	}
}

client.login(token);
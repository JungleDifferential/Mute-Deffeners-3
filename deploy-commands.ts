import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

const { clientId, guildId, token } = require('./config.json');

const commands = [];

// get all the command files in ./commands/ with .js ending
const deployCommandsPath = path.join(__dirname, 'commands');
const deployCommandFiles = fs.readdirSync(deployCommandsPath).filter((file: string) => file.endsWith('.js'));
for (const file of deployCommandFiles) {
    const filePath = path.join(deployCommandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application slash commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${(data as any[]).length} application slash commands.`);
	} catch (error) {
		console.error(error);
	}
})();

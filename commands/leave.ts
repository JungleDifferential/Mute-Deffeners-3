import { botData } from "../initBotData";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("make mute/deffeners leave the current channel"),
    async execute(interaction: ChatInputCommandInteraction) {
        if (botData.currentChannel === null) {
            interaction.reply('bro im not even in a voice channel right now');
        }

        if (interaction.guild === null) {
            console.error(`[ERROR] /leave interaction.guild is null`);
            return;
        }
        
        const connection = getVoiceConnection(interaction.guild.id);
        if (connection === undefined) {
            console.error(`[ERROR] /leave connection was null`);
            return;
        }
        connection.destroy();
        botData.currentChannel = null;

        interaction.reply("aight im out");
    }
}
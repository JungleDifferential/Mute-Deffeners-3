import { botData } from '../initBotData';
import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Tell mute/deffeners to join your voice channel"),
    async execute(interaction: ChatInputCommandInteraction) {
        const member = interaction.member;
        if (!(member instanceof GuildMember)) {
            console.error(`ERROR /join interaction.member is incorrect type`);
            return;
        }
        if (member.voice.channel === null) {
            await interaction.reply("bro you think i can join your vc if youre not in one?");
            return;
        }

        joinVoiceChannel({
            channelId: member.voice.channel.id,
			guildId: member.guild.id,
			selfDeaf: false,
			adapterCreator: member.guild.voiceAdapterCreator
        });
        botData.currentChannel = member.voice.channel.id;

        interaction.reply("aight im in");
    }
}
import { botData } from "../initBotData";
import { Events, VoiceState } from "discord.js";

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState: VoiceState, newState: VoiceState) {
        if (oldState.selfMute === newState.selfMute && 
            oldState.selfDeaf === newState.selfDeaf && 
            oldState.channelId === newState.channelId) {
                return;
        }
        if (newState.member === null) {
            return;
        }

        const memberId = newState.member.id;
        if (botData.mode == "off") {
            return;
        }

        let channelId = newState.channelId;
        if (!channelId) {
            return;
        }

        const violation = ((newState.selfMute && botData.mode == "mute") || 
                          (newState.selfDeaf && botData.mode == "deafen"));
        if (channelId == botData.muteDeafenChannelId && !violation) {
            if (botData.prevMemberChannels.has(memberId)) {
                const prevChannelId = botData.prevMemberChannels.get(memberId);
                if (prevChannelId === undefined) {
                    return;
                }
                newState.setChannel(prevChannelId);
                botData.prevMemberChannels.delete(memberId);
                return;
            }
            newState.setChannel(botData.defaultChannelId);
            return;
        }
        if (channelId != botData.muteDeafenChannelId && violation) {
            botData.prevMemberChannels.set(memberId, channelId);
            newState.setChannel(botData.muteDeafenChannelId);
            return;
        }
    }
};
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Check the bot's latency");

export async function execute(interaction: ChatInputCommandInteraction) {
  const sent = await interaction.reply({
    content: "Pinging...",
    fetchReply: true,
  });
  const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;
  const wsHeartbeat = Math.round(interaction.client.ws.ping);
  await interaction.editReply(
    `🏓 **Pong!**\nRoundtrip: **${roundtrip}ms**\nWebSocket: **${wsHeartbeat}ms**`
  );
}

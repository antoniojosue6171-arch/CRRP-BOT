import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("List all available commands");

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle("Bot Commands")
    .setDescription("Here are all the available commands:")
    .addFields(
      { name: "/ping", value: "Check the bot's latency" },
      { name: "/help", value: "Show this help message" },
      { name: "/serverinfo", value: "Display server information" },
      { name: "/userinfo [user]", value: "Display information about a user" },
      { name: "/avatar [user]", value: "Show a user's avatar" },
      { name: "/clear <amount>", value: "Delete messages from a channel (Manage Messages)" },
      { name: "/kick <user> [reason]", value: "Kick a member from the server (Kick Members)" },
      { name: "/ban <user> [reason]", value: "Ban a member from the server (Ban Members)" },
    )
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

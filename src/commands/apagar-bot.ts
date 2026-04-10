import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import { botState } from "../botState.js";

export const data = new SlashCommandBuilder()
  .setName("apagar-bot")
  .setDescription("Desconecta el bot de Discord")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!botState.active) {
    await interaction.reply({ content: "El bot ya está apagado.", ephemeral: true });
    return;
  }

  botState.active = false;
  await interaction.reply({ content: "🔴 Bot apagado.", ephemeral: true });

  interaction.client.user.setStatus("invisible");
}

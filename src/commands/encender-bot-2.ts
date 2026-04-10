import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ActivityType } from "discord.js";
import { botState } from "../botState.js";

export const data = new SlashCommandBuilder()
  .setName("encender-bot-2")
  .setDescription("Enciende el bot cuando está offline (solo funciona cuando está apagado)")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (botState.active) {
    await interaction.reply({ content: "El bot ya está encendido.", ephemeral: true });
    return;
  }

  botState.active = true;
  interaction.client.user.setPresence({
    status: "online",
    activities: [{ name: "tu server", type: ActivityType.Watching }],
  });

  await interaction.reply({ content: "✅ Bot encendido.", ephemeral: true });
}

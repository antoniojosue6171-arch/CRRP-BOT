import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pase-de-lista")
  .setDescription("Realiza el pase de lista para el equipo de moderación")
  .addStringOption((opt) =>
    opt.setName("fecha").setDescription("Fecha del pase de lista (ej: 15/04/2026)").setRequired(true)
  )
  .addUserOption((opt) =>
    opt.setName("encargado").setDescription("Encargado de revisar la asistencia").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction: ChatInputCommandInteraction) {
  const fecha = interaction.options.getString("fecha", true);
  const encargado = interaction.options.getUser("encargado", true);

  const embed = new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle("🚨 PASE DE LISTA - MODERACIÓN 🚨")
    .setDescription(
      "📋 Se está realizando pase de lista para el equipo de moderación.\n\n" +
      "✅ Todo moderador debe marcar su asistencia.\n\n" +
      "⚠️ **IMPORTANTE:**\n" +
      "Si se descubre que marcaste asistencia y no realizaste tu labor de moderación, serás sancionado ❌.\n\n" +
      "📝 En caso de no haber moderado, deberás justificar tu inactividad de manera válida.\n\n" +
      "🔍 Se estará supervisando el cumplimiento de funciones.\n\n" +
      "💼 Recuerda: ser moderador no es solo marcar, es cumplir con tu responsabilidad.\n\n" +
      "— Administración"
    )
    .addFields(
      { name: "📅 Fecha", value: fecha, inline: true },
      { name: "👮 Encargado de revisar", value: `${encargado}`, inline: true },
    )
    .setFooter({ text: "Costa Rica RP • CRRP | Moderación" })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

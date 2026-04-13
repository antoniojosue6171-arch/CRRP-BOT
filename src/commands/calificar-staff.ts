import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("calificar-staff")
  .setDescription("Califica el desempeño de un miembro del staff")
  .addUserOption((opt) =>
    opt.setName("staff").setDescription("Miembro del staff a calificar").setRequired(true)
  )
  .addIntegerOption((opt) =>
    opt.setName("calificacion").setDescription("Calificación del 1 al 10").setRequired(true).setMinValue(1).setMaxValue(10)
  )
  .addStringOption((opt) =>
    opt.setName("debe_mejorar").setDescription("¿En qué debe mejorar? (opcional)").setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const staff = interaction.options.getUser("staff", true);
  const calificacion = interaction.options.getInteger("calificacion", true);
  const debeMejorar = interaction.options.getString("debe_mejorar");

  const estrellas = "⭐".repeat(calificacion) + "☆".repeat(10 - calificacion);

  let color: number;
  if (calificacion >= 8) color = 0x57f287;
  else if (calificacion >= 5) color = 0xfee75c;
  else color = 0xed4245;

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle("📋 Calificación de Staff — Costa Rica RP")
    .setThumbnail(staff.displayAvatarURL({ size: 128 }))
    .addFields(
      { name: "👮 Staff Calificado", value: `${staff} (${staff.username})`, inline: true },
      { name: "👤 Calificado por", value: `${interaction.user} (${interaction.user.username})`, inline: true },
      { name: "\u200B", value: "\u200B" },
      { name: "⭐ Calificación", value: `**${calificacion}/10**\n${estrellas}`, inline: false },
    )
    .setFooter({ text: "Costa Rica RP • CRRP" })
    .setTimestamp();

  if (debeMejorar) {
    embed.addFields({ name: "📝 Debe mejorar", value: debeMejorar, inline: false });
  }

  await interaction.reply({ embeds: [embed] });
}

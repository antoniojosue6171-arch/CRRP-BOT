import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("sancionar")
  .setDescription("Aplica una sanción a un usuario")
  .addUserOption((opt) =>
    opt.setName("usuario").setDescription("Usuario a sancionar").setRequired(true)
  )
  .addStringOption((opt) =>
    opt.setName("sancion").setDescription("Tipo de sanción (ej: Advertencia, Mute, etc.)").setRequired(true)
  )
  .addStringOption((opt) =>
    opt.setName("motivo").setDescription("Motivo de la sanción").setRequired(true)
  )
  .addIntegerOption((opt) =>
    opt.setName("conteo").setDescription("Conteo de sanciones del usuario").setRequired(true).setMinValue(1)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const usuario = interaction.options.getUser("usuario", true);
  const sancion = interaction.options.getString("sancion", true);
  const motivo = interaction.options.getString("motivo", true);
  const conteo = interaction.options.getInteger("conteo", true);

  const embed = new EmbedBuilder()
    .setColor(0xffa500)
    .setTitle("📋 Sanción Aplicada — Costa Rica RP")
    .setThumbnail(usuario.displayAvatarURL({ size: 128 }))
    .addFields(
      { name: "👤 Usuario Sancionado", value: `${usuario} (${usuario.username})`, inline: false },
      { name: "⚠️ Sanción", value: sancion, inline: true },
      { name: "👮 Staff que Sanciona", value: `${interaction.user} (${interaction.user.username})`, inline: true },
      { name: "📋 Motivo de la Sanción", value: motivo, inline: false },
      { name: "🔢 Conteo de Sanciones", value: `${conteo}`, inline: false },
    )
    .setFooter({ text: `Costa Rica RP • CRRP • ID: ${usuario.id}` })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

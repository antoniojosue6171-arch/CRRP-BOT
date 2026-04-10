import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("banear")
  .setDescription("Registra un baneo en el servidor")
  .addUserOption((opt) =>
    opt.setName("usuario").setDescription("Usuario a banear").setRequired(true)
  )
  .addStringOption((opt) =>
    opt.setName("tipo").setDescription("Tipo de baneo").setRequired(true)
      .addChoices(
        { name: "Temporal", value: "Temporal" },
        { name: "Permanente", value: "Permanente" },
      )
  )
  .addStringOption((opt) =>
    opt.setName("motivo").setDescription("Motivo del baneo").setRequired(true)
  )
  .addStringOption((opt) =>
    opt.setName("apelable").setDescription("¿Es apelable?").setRequired(true)
      .addChoices(
        { name: "Sí es apelable", value: "✅ Sí es apelable" },
        { name: "No es apelable", value: "❌ No es apelable" },
      )
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const usuario = interaction.options.getUser("usuario", true);
  const tipo = interaction.options.getString("tipo", true);
  const motivo = interaction.options.getString("motivo", true);
  const apelable = interaction.options.getString("apelable", true);

  const embed = new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle("🔨 Baneo Registrado — Costa Rica RP")
    .setThumbnail(usuario.displayAvatarURL({ size: 128 }))
    .addFields(
      { name: "👤 Usuario Baneado", value: `${usuario} (${usuario.username})`, inline: false },
      { name: "⚖️ Tipo de Baneo", value: tipo, inline: true },
      { name: "👮 Staff que Banea", value: `${interaction.user} (${interaction.user.username})`, inline: true },
      { name: "📋 Motivo del Ban", value: motivo, inline: false },
      { name: "📩 Apelable", value: apelable, inline: false },
    )
    .setFooter({ text: `Costa Rica RP • CRRP • ID: ${usuario.id}` })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } from "discord.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { activeVote } from "../voteStore.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const data = new SlashCommandBuilder()
  .setName("abrir-votacion")
  .setDescription("Abre una votación para abrir el servidor")
  .addStringOption((opt) =>
    opt.setName("hora_apertura").setDescription("Hora de apertura (ej: 20:00)").setRequired(true)
  )
  .addIntegerOption((opt) =>
    opt.setName("duracion").setDescription("Duración de la votación en minutos").setRequired(true).setMinValue(1)
  )
  .addIntegerOption((opt) =>
    opt.setName("civiles").setDescription("Mínimo de civiles necesarios").setRequired(true).setMinValue(1)
  )
  .addIntegerOption((opt) =>
    opt.setName("moderadores").setDescription("Mínimo de moderadores necesarios").setRequired(true).setMinValue(1)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction: ChatInputCommandInteraction) {
  const hora = interaction.options.getString("hora_apertura", true);
  const duracion = interaction.options.getInteger("duracion", true);
  const civiles = interaction.options.getInteger("civiles", true);
  const moderadores = interaction.options.getInteger("moderadores", true);

  const imagen = new AttachmentBuilder(join(__dirname, "assets/encuesta-apertura.jpg"), { name: "encuesta-apertura.jpg" });

  const embed = new EmbedBuilder()
    .setColor(0xffa500)
    .setTitle("🗳️ ¡VOTACIÓN PARA ABRIR SERVER!")
    .setDescription(
      "¡Reacciona abajo para indicar si estás listo para rolear!\n" +
      "Cuando se alcance el mínimo requerido, ¡abrimos! 🔥"
    )
    .addFields(
      { name: "🕐 Hora de apertura", value: hora, inline: true },
      { name: "⏱️ Duración de la votación", value: `${duracion} minutos`, inline: true },
      { name: "\u200B", value: "\u200B" },
      { name: "✅ Civiles", value: `Reacciona con ✅ si eres civil\nSe necesitan: **${civiles}** civil(es)`, inline: false },
      { name: "🔧 Moderadores", value: `Reacciona con 🔧 si eres moderador\nSe necesitan: **${moderadores}** moderador(es)`, inline: false },
      { name: "❌ No se puede unir", value: "Reaccionar así", inline: false },
    )
    .setImage("attachment://encuesta-apertura.jpg")
    .setFooter({ text: `Votación iniciada por ${interaction.user.username} • Costa Rica RP` })
    .setTimestamp();

  const reply = await interaction.reply({ embeds: [embed], files: [imagen], fetchReply: true });

  await reply.react("✅");
  await reply.react("🔧");
  await reply.react("❌");

  activeVote.messageId = reply.id;
  activeVote.channelId = interaction.channelId;
  activeVote.civilesMin = civiles;
  activeVote.moderadoresMin = moderadores;
  activeVote.initiator = interaction.user.username;
}

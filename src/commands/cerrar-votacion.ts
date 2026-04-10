import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, TextChannel } from "discord.js";
import { activeVote } from "../voteStore.js";

export const data = new SlashCommandBuilder()
  .setName("cerrar-votacion")
  .setDescription("Cierra la votación activa y muestra los resultados")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!activeVote.messageId || !activeVote.channelId) {
    await interaction.reply({ content: "No hay ninguna votación activa en este momento.", ephemeral: true });
    return;
  }

  try {
    const channel = await interaction.client.channels.fetch(activeVote.channelId) as TextChannel;
    const voteMessage = await channel.messages.fetch(activeVote.messageId);

    const civilesCuenta = (voteMessage.reactions.cache.get("✅")?.count ?? 1) - 1;
    const moderadoresCuenta = (voteMessage.reactions.cache.get("🔧")?.count ?? 1) - 1;

    const civilesMin = activeVote.civilesMin ?? 1;
    const moderadoresMin = activeVote.moderadoresMin ?? 1;
    const abre = civilesCuenta >= civilesMin && moderadoresCuenta >= moderadoresMin;

    const embed = new EmbedBuilder()
      .setColor(abre ? 0x00ff00 : 0xff0000)
      .setTitle(abre ? "✅ VOTACIÓN CERRADA — ABRIMOS" : "🔒 VOTACIÓN CERRADA — NO ABRIMOS")
      .setDescription(
        abre
          ? "¡Se alcanzó el mínimo requerido! El servidor se abre 🔥"
          : `No se alcanzó el mínimo requerido. El servidor permanece cerrado 😔`
      )
      .addFields(
        { name: "✅ Civiles que se unieron", value: `${civilesCuenta}`, inline: true },
        { name: "🔧 Moderadores que se unieron", value: `${moderadoresCuenta}`, inline: true },
      )
      .setFooter({ text: `Votación cerrada por ${interaction.user.username} • Costa Rica RP` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    activeVote.messageId = null;
    activeVote.channelId = null;
    activeVote.civilesMin = null;
    activeVote.moderadoresMin = null;
    activeVote.initiator = null;
  } catch {
    await interaction.reply({ content: "No se pudo cerrar la votación. El mensaje original puede haber sido eliminado.", ephemeral: true });
  }
}

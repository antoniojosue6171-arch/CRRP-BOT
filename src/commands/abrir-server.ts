import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } from "discord.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const data = new SlashCommandBuilder()
  .setName("abrir-server")
  .setDescription("Anuncia que el servidor está abierto")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction: ChatInputCommandInteraction) {
  const imagen = new AttachmentBuilder(join(__dirname, "assets/server-on.jpg"), { name: "server-on.jpg" });

  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle("🚨 ¡SERVER ABIERTO! 🚨")
    .setDescription(
      "¡Atención a todos! El servidor ya está ABIERTO 🔓\n" +
      "Vengan a rolear y pasarla bien con la mejor experiencia 💯🔥\n\n" +
      "📌 Código para unirse: **\"costarica\"**\n\n" +
      "No te lo pierdas, hay rol activo, diversión y muchas oportunidades 👀🎭\n" +
      "¡Los esperamos dentro!"
    )
    .setImage("attachment://server-on.jpg")
    .setFooter({ text: `Costa Rica RP • CRRP | Abierto por ${interaction.user.username}` })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], files: [imagen] });
}

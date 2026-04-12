import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits } from "discord.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const data = new SlashCommandBuilder()
  .setName("cerrar-server")
  .setDescription("Anuncia que el servidor ha sido cerrado")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction: ChatInputCommandInteraction) {
  const imagen = new AttachmentBuilder(join(__dirname, "assets/server-off.jpg"), { name: "server-off.jpg" });

  const embed = new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle("🔒 ¡SERVER CERRADO! 🔒")
    .setDescription(
      "El servidor ha sido cerrado por el momento 🚫\n\n" +
      "🙏 Gracias a todos los que se unieron a rolear y hicieron de la sesión algo increíble 💯🎭\n" +
      "Se agradece su participación, respeto y buen ambiente 🤝🔥\n\n" +
      "📢 ¡Pendientes para la próxima apertura!\n\n" +
      "¡Nos vemos pronto! 👀✨"
    )
    .setImage("attachment://server-off.jpg")
    .setFooter({ text: `Costa Rica RP • CRRP | Cerrado por ${interaction.user.username}` })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], files: [imagen] });
}

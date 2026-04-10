import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

  export const data = new SlashCommandBuilder()
    .setName("registrar-cedula")
    .setDescription("Registra tu cédula de identidad en el servidor")
    .addStringOption(opt =>
      opt.setName("usuario_roblox").setDescription("Tu nombre de usuario en Roblox").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("fecha_nacimiento").setDescription("Tu fecha de nacimiento (DD/MM/AAAA)").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("provincia").setDescription("Tu provincia en Costa Rica").setRequired(true)
        .addChoices(
          { name: "San José", value: "San José" },
          { name: "Alajuela", value: "Alajuela" },
          { name: "Cartago", value: "Cartago" },
          { name: "Heredia", value: "Heredia" },
          { name: "Guanacaste", value: "Guanacaste" },
          { name: "Puntarenas", value: "Puntarenas" },
          { name: "Limón", value: "Limón" },
          { name: "Pérez Zeledón", value: "Pérez Zeledón" },
          { name: "Zona Norte", value: "Zona Norte" }
        )
    )
    .addNumberOption(opt =>
      opt.setName("estatura").setDescription("Tu estatura en metros (ej: 1.75)").setRequired(true).setMinValue(0.5).setMaxValue(2.5)
    );

  async function getRobloxAvatar(username: string): Promise<{ avatarUrl: string | null; userId: number | null }> {
    try {
      const searchRes = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
      });
      const searchData = await searchRes.json() as { data: { id: number; name: string }[] };
      if (!searchData.data || searchData.data.length === 0) return { avatarUrl: null, userId: null };
      const userId = searchData.data[0].id;
      const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
      const thumbData = await thumbRes.json() as { data: { imageUrl: string }[] };
      const avatarUrl = thumbData.data?.[0]?.imageUrl ?? null;
      return { avatarUrl, userId };
    } catch {
      return { avatarUrl: null, userId: null };
    }
  }

  export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const usuarioRoblox = interaction.options.getString("usuario_roblox", true);
    const fechaNacimiento = interaction.options.getString("fecha_nacimiento", true);
    const provincia = interaction.options.getString("provincia", true);
    const estatura = interaction.options.getNumber("estatura", true);
    const discordUser = interaction.user;

    const { avatarUrl, userId } = await getRobloxAvatar(usuarioRoblox);

    const embed = new EmbedBuilder()
      .setTitle("🪪 Cédula de Identidad — Costa Rica")
      .setColor(0x002B7F)
      .addFields(
        { name: "👤 Usuario de Discord", value: `${discordUser.globalName ?? discordUser.username} (${discordUser.tag})`, inline: false },
        { name: "🎮 Usuario de Roblox", value: userId ? `[${usuarioRoblox}](https://www.roblox.com/users/${userId}/profile)` : usuarioRoblox, inline: true },
        { name: "🎂 Fecha de Nacimiento", value: fechaNacimiento, inline: true },
        { name: "🇨🇷 País", value: "Costa Rica", inline: true },
        { name: "📍 Provincia", value: provincia, inline: true },
        { name: "📏 Estatura", value: `${estatura.toFixed(2)} m`, inline: true },
      )
      .setFooter({ text: "Registro oficial del servidor" })
      .setTimestamp();

    if (avatarUrl) embed.setThumbnail(avatarUrl);
    else embed.addFields({ name: "⚠️ Roblox", value: "No se encontró el usuario en Roblox.", inline: false });

    await interaction.editReply({ embeds: [embed] });
  }
  
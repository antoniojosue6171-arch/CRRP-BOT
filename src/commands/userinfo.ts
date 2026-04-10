import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("userinfo")
  .setDescription("Display information about a user")
  .addUserOption((option) =>
    option.setName("user").setDescription("The user to inspect").setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const user = interaction.options.getUser("user") ?? interaction.user;
  const member = interaction.guild?.members.cache.get(user.id) as GuildMember | undefined;

  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle(user.tag)
    .setThumbnail(user.displayAvatarURL({ size: 256 }))
    .addFields(
      { name: "ID", value: user.id, inline: true },
      { name: "Bot", value: user.bot ? "Yes" : "No", inline: true },
      { name: "Account Created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
    );

  if (member) {
    embed.addFields(
      { name: "Joined Server", value: member.joinedAt ? `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>` : "Unknown", inline: true },
      { name: "Nickname", value: member.nickname ?? "None", inline: true },
      { name: "Roles", value: member.roles.cache.filter((r) => r.id !== interaction.guild!.id).map((r) => `${r}`).join(", ") || "None", inline: false },
    );
  }

  embed.setTimestamp();
  await interaction.reply({ embeds: [embed] });
}

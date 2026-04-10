import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Ban a member from the server")
  .addUserOption((option) =>
    option.setName("user").setDescription("The member to ban").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("Reason for the ban").setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.BanMembers)) {
    await interaction.reply({ content: "You need the **Ban Members** permission to use this command.", ephemeral: true });
    return;
  }

  const user = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason") ?? "No reason provided";
  const member = interaction.guild?.members.cache.get(user.id);

  if (member && !member.bannable) {
    await interaction.reply({ content: "I cannot ban this user. They may have a higher role than me.", ephemeral: true });
    return;
  }

  try {
    await interaction.guild?.members.ban(user, { reason });
    const embed = new EmbedBuilder()
      .setColor(0xed4245)
      .setTitle("Member Banned")
      .addFields(
        { name: "User", value: `${user.tag} (${user.id})`, inline: true },
        { name: "Banned By", value: `${interaction.user.tag}`, inline: true },
        { name: "Reason", value: reason },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  } catch {
    await interaction.reply({ content: "Failed to ban the user.", ephemeral: true });
  }
}

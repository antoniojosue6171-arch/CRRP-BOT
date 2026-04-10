import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Kick a member from the server")
  .addUserOption((option) =>
    option.setName("user").setDescription("The member to kick").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("Reason for the kick").setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.KickMembers)) {
    await interaction.reply({ content: "You need the **Kick Members** permission to use this command.", ephemeral: true });
    return;
  }

  const user = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason") ?? "No reason provided";
  const member = interaction.guild?.members.cache.get(user.id);

  if (!member) {
    await interaction.reply({ content: "User not found in this server.", ephemeral: true });
    return;
  }

  if (!member.kickable) {
    await interaction.reply({ content: "I cannot kick this user. They may have a higher role than me.", ephemeral: true });
    return;
  }

  try {
    await member.kick(reason);
    const embed = new EmbedBuilder()
      .setColor(0xed4245)
      .setTitle("Member Kicked")
      .addFields(
        { name: "User", value: `${user.tag} (${user.id})`, inline: true },
        { name: "Kicked By", value: `${interaction.user.tag}`, inline: true },
        { name: "Reason", value: reason },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  } catch {
    await interaction.reply({ content: "Failed to kick the user.", ephemeral: true });
  }
}

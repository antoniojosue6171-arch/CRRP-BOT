import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Delete messages from a channel")
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("Number of messages to delete (1-100)")
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(100)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
    await interaction.reply({ content: "You need the **Manage Messages** permission to use this command.", ephemeral: true });
    return;
  }

  const amount = interaction.options.getInteger("amount", true);
  const channel = interaction.channel as TextChannel;

  if (!channel || !("bulkDelete" in channel)) {
    await interaction.reply({ content: "This command can only be used in text channels.", ephemeral: true });
    return;
  }

  try {
    const deleted = await channel.bulkDelete(amount, true);
    await interaction.reply({
      content: `Deleted **${deleted.size}** message(s).`,
      ephemeral: true,
    });
  } catch {
    await interaction.reply({
      content: "Failed to delete messages. Messages older than 14 days cannot be bulk deleted.",
      ephemeral: true,
    });
  }
}

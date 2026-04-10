import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("Show a user's avatar")
  .addUserOption((option) =>
    option.setName("user").setDescription("The user whose avatar to show").setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const user = interaction.options.getUser("user") ?? interaction.user;

  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle(`${user.tag}'s Avatar`)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

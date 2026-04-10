import { Events, GuildMember, EmbedBuilder, TextChannel } from "discord.js";

export const name = Events.GuildMemberAdd;
export const once = false;

export async function execute(member: GuildMember) {
  const channel = member.guild.systemChannel;
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(0x57f287)
    .setTitle("Welcome!")
    .setDescription(
      `Hey ${member}, welcome to **${member.guild.name}**! You are member #${member.guild.memberCount}.`
    )
    .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
    .setTimestamp();

  await (channel as TextChannel).send({ embeds: [embed] });
}

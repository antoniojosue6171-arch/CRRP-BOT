import { Events, GuildMember, PartialGuildMember, TextChannel } from "discord.js";

export const name = Events.GuildMemberRemove;
export const once = false;

export async function execute(member: GuildMember | PartialGuildMember) {
  const channel = member.guild.systemChannel;
  if (!channel) return;

  await (channel as TextChannel).send(
    `**${member.user?.tag ?? "A member"}** has left the server.`
  );
}

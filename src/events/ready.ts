import { Client, Events, ActivityType } from "discord.js";

export const name = Events.ClientReady;
export const once = true;

export function execute(client: Client<true>) {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Serving ${client.guilds.cache.size} server(s)`);

  client.user.setActivity("your server", { type: ActivityType.Watching });
}

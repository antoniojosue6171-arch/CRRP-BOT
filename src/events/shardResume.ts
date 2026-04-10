import { Events, Client, ActivityType } from "discord.js";
import { botState } from "../botState.js";

export const name = Events.ShardReady;
export const once = false;

export async function execute(client: Client) {
  if (!botState.active) return;

  client.user?.setPresence({
    status: "online",
    activities: [{ name: "tu server", type: ActivityType.Watching }],
  });
}

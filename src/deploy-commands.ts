import { REST, Routes } from "discord.js";
import { commands } from "./commands/index.js";

const token = process.env["DISCORD_BOT_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];

if (!token || !clientId) {
  console.error("Missing DISCORD_BOT_TOKEN or DISCORD_CLIENT_ID environment variables.");
  process.exit(1);
}

const rest = new REST().setToken(token);

const commandData = [...commands.values()].map((cmd) => cmd.data.toJSON());

console.log(`Registering ${commandData.length} slash commands...`);

try {
  await rest.put(Routes.applicationCommands(clientId), { body: commandData });
  console.log("Successfully registered slash commands globally.");
} catch (error) {
  console.error("Failed to register commands:", error);
  process.exit(1);
}

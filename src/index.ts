import { Client, GatewayIntentBits } from "discord.js";
import { createServer } from "http";
import { commands } from "./commands/index.js";
import * as ready from "./events/ready.js";
import * as interactionCreate from "./events/interactionCreate.js";

const token = process.env["DISCORD_BOT_TOKEN"];
if (!token) {
  console.error("DISCORD_BOT_TOKEN is not set. Please add it to your environment secrets.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const events = [ready, interactionCreate];

for (const event of events) {
  if (event.once) {
    client.once(event.name, (...args: unknown[]) => (event.execute as (...a: unknown[]) => void)(...args));
  } else {
    client.on(event.name, (...args: unknown[]) => (event.execute as (...a: unknown[]) => void)(...args));
  }
}

void commands;

client.login(token);

const port = process.env["PORT"] ? Number(process.env["PORT"]) : 3000;
createServer((_req, res) => {
  res.writeHead(200);
  res.end("Bot en línea");
}).listen(port, () => {
  console.log(`Servidor HTTP escuchando en puerto ${port}`);
});

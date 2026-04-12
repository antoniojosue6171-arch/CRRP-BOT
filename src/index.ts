import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { createServer } from "http";
import { commands } from "./commands/index.js";
import * as ready from "./events/ready.js";
import * as interactionCreate from "./events/interactionCreate.js";

const token = process.env["DISCORD_BOT_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];

if (!token) {
  console.error("DISCORD_BOT_TOKEN is not set.");
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

async function registerCommands() {
  if (!clientId) {
    console.warn("DISCORD_CLIENT_ID no configurado — saltando registro de comandos.");
    return;
  }
  try {
    const rest = new REST().setToken(token!);
    const commandData = [...commands.values()].map((cmd) => cmd.data.toJSON());
    await rest.put(Routes.applicationCommands(clientId), { body: commandData });
    console.log(`✅ ${commandData.length} comandos registrados en Discord.`);
  } catch (error) {
    console.error("Error registrando comandos:", error);
  }
}

void registerCommands();
client.login(token);

const port = process.env["PORT"] ? Number(process.env["PORT"]) : 3000;
createServer((_req, res) => {
  res.writeHead(200);
  res.end("Bot en línea");
}).listen(port, () => {
  console.log(`Servidor HTTP escuchando en puerto ${port}`);
});

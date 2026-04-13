import { Client, GatewayIntentBits, REST, Routes, Events } from "discord.js";
import { createServer } from "http";
import { commands } from "./commands/index.js";
import * as interactionCreate from "./events/interactionCreate.js";

const token = process.env["DISCORD_BOT_TOKEN"];

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

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Sesión iniciada como ${readyClient.user.tag}`);
  console.log(`Sirviendo a ${readyClient.guilds.cache.size} servidor(es)`);
  readyClient.user.setActivity("your server", { type: 3 });

  try {
    const rest = new REST().setToken(token!);
    const commandData = [...commands.values()].map((cmd) => cmd.data.toJSON());
    await rest.put(Routes.applicationCommands(readyClient.user.id), { body: commandData });
    console.log(`✅ ${commandData.length} comandos registrados en Discord.`);
  } catch (error) {
    console.error("Error registrando comandos:", error);
  }
});

client.on(interactionCreate.name, (...args: unknown[]) =>
  (interactionCreate.execute as (...a: unknown[]) => void)(...args)
);

client.login(token);

const port = process.env["PORT"] ? Number(process.env["PORT"]) : 3000;
createServer((_req, res) => {
  res.writeHead(200);
  res.end("Bot en línea");
}).listen(port, () => {
  console.log(`Servidor HTTP escuchando en puerto ${port}`);
});

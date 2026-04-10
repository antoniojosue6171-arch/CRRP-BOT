import { Collection, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import * as ping from "./ping.js";
import * as help from "./help.js";
import * as serverinfo from "./serverinfo.js";
import * as userinfo from "./userinfo.js";
import * as avatar from "./avatar.js";
import * as clear from "./clear.js";
import * as kick from "./kick.js";
import * as ban from "./ban.js";
import * as abrirServer from "./abrir-server.js";
import * as cerrarServer from "./cerrar-server.js";
import * as abrirVotacion from "./abrir-votacion.js";
import * as cerrarVotacion from "./cerrar-votacion.js";
import * as banear from "./banear.js";
import * as sancionar from "./sancionar.js";
import * as encenderBot from "./encender-bot.js";
import * as apagarBot from "./apagar-bot.js";
import * as encenderBot2 from "./encender-bot-2.js";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

const commandModules: Command[] = [
  ping, help, serverinfo, userinfo, avatar, clear, kick, ban,
  abrirServer, cerrarServer, abrirVotacion, cerrarVotacion, banear, sancionar,
  encenderBot, apagarBot, encenderBot2,
];

export const commands = new Collection<string, Command>();
for (const mod of commandModules) {
  commands.set(mod.data.name, mod);
}

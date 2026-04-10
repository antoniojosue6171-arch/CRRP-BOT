import { Events, Interaction } from "discord.js";
import { commands } from "../commands/index.js";
import { botState } from "../botState.js";

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (!botState.active) {
    if (interaction.commandName === "encender-bot-2") {
      const command = commands.get("encender-bot-2");
      if (command) await command.execute(interaction);
    }
    return;
  }

  const command = commands.get(interaction.commandName);
  if (!command) {
    console.warn(`No command found for: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    const content = "Hubo un error ejecutando este comando.";
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content, ephemeral: true });
    } else {
      await interaction.reply({ content, ephemeral: true });
    }
  }
}

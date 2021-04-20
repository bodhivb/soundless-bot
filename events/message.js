const { prefix } = require("../config.json");

// Handling an incoming message
module.exports = async (bot, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName);
  if (command) command.run(bot, message, args);
};

const { prefix } = require("../config.json");
const { authorId } = require("../config.json");

// Handling an incoming message
module.exports = async (bot, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName);
  if (command) {
    //Check user permission
    if (message.author.id !== authorId && command.config.userPermissions) {
      if (!message.member.hasPermission(command.config.userPermissions)) return;
    }

    command.run(bot, message, args);
  }
};

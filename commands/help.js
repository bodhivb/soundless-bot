const { prefix } = require("../config.json");

module.exports.config = {
  name: "help",
  description: "Show you all of the commands.",
  usage: "help",
  userPermissions: ["MANAGE_GUILD"],
};

module.exports.run = async (bot, message, args) => {
  let helpMessages = [];
  bot.commands.forEach((command) => {
    helpMessages.push({
      name: command.config.name,
      value:
        command.config.description +
        `. \nUsage: \`${prefix}` +
        command.config.usage +
        "`",
    });
  });
  message.author.send({
    embeds: [{
      title: "Available commands",
      description: `[user] = this parameter can be id or user tag.`,
      color: 12901133,
      fields: helpMessages,
    }],
  });

  message.channel.send({ content: "Help pages has been sent to you." });
};

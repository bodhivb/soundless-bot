const { database } = require("../libraries/database");
const slash = require("../libraries/slash");

module.exports.config = {
  name: "delete-gif",
  description: "Delete Soundless gif",
  usage: "delete-gif [name]",
  userPermissions: ["MANAGE_GUILD"],
};

module.exports.run = async (bot, message, args) => {
  if (args.length < 1) return;

  const guild = database.getGuild(message.guild.id);
  const success = guild.deleteGif(args[0]);

  message.react(success ? "✅" : "❌");

  //Refresh gif options
  slash.reload(bot);
  //Wait 2 secs to register again
  setTimeout(() => {
    slash.registerCommand(bot, message.guild.id);
  }, 2 * 1000);
};

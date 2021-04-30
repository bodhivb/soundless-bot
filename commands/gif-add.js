const { database } = require("../libraries/database");
const slash = require("../libraries/slash");

module.exports.config = {
  name: "add-gif",
  description: "Add Soundless gif",
  usage: "add-gif [name] [url]",
  userPermissions: ["MANAGE_GUILD"],
};

module.exports.run = async (bot, message, args) => {
  if (args.length < 2) return;

  const guild = database.getGuild(message.guild.id);
  const success = guild.addGif(args[0], args[1]);

  message.react(success ? "✅" : "❌");

  //Refresh gif options
  slash.reload(bot);
  //Wait 2 secs to register again
  setTimeout(() => {
    slash.registerCommand(bot, message.guild.id);
  }, 2 * 1000);
};

const { database } = require("../libraries/database");
const { Guilds } = require("../libraries/constants");
const { Permissions } = require('discord.js');

module.exports.config = {
  name: "delete-bday",
  description: "Delete someone birthday date",
  usage: "delete-bday [user]",
  userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
};

//this command is only available for soundless server
module.exports.run = async (bot, message, args) => {
  if (message.guild.id !== Guilds.SL) return;

  if (args.length < 1) {
    return message.react("❌");
  }

  let mention = args[0];
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);
    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
  }

  const user = database.getUser(mention);
  if (user.deleteBirthday()) {
    message.react("✅");
  } else {
    message.react("❌");
  }
};

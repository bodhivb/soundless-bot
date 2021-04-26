const { database } = require("../libraries/database");
const { Guilds } = require("../libraries/constants");

module.exports.config = {
  name: "edit-bday",
  description: "Edit someone birthday date",
  usage: "edit-bday [user] [dd-mm-yyyy]",
  userPermissions: ["MANAGE_GUILD"],
};

//this command is only available for soundless server
module.exports.run = async (bot, message, args) => {
  if (message.guild.id !== Guilds.SL) return;

  if (args.length >= 2) {
    const str = args[1].split(/-|\//);

    if (str.length < 3) {
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

    //Month start with 0
    const date = new Date(str[2], str[1] - 1, str[0]);

    if (isNaN(date)) {
      //Date is invaild
      message.react("❌");
    } else {
      //Apply birth date
      user.setBirthday(date);
      message.react("✅");
    }
  }
};

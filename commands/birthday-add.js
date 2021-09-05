const { database } = require("../libraries/database");

module.exports.config = {
  name: "add-bday",
  description: "Add your birthday date",
  usage: "add-bday [dd-mm-yyyy]",
};

module.exports.run = async (bot, message, args) => {
  if (!args || args.length === 0) {
    return message.react("❌");
  }

  const str = args[0].split(/-|\//);

  if (str.length < 3) {
    return message.react("❌");
  }

  const user = database.getUser(message.author.id);

  //Check if user already adds a birthday
  if (user.getBirthday()) {
    return message.reply(
      "Sorry, you already registered your birthday date. Ask board or moderator to change your birthday date if you made a mistake."
    );
  }

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
};

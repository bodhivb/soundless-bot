const { dayLeft } = require("../libraries/common");
const { database } = require("../libraries/database");

module.exports.config = {
  name: "bday",
  description: "Show how many days until your birthday",
  usage: "bday",
};

module.exports.run = async (bot, message, args) => {
  const user = database.getUser(message.author.id);
  const bday = user.getBirthday() ? new Date(user.getBirthday()) : undefined;

  //Add time to fix day time zone
  let nextBirthday = new Date(
    new Date().getFullYear(),
    bday.getMonth(),
    bday.getDate(),
    bday.getHours(),
    bday.getMinutes()
  );

  if (dayLeft(nextBirthday) === 0) {
    //Today is your birthday!
    message.react("🎉");
  } else {
    //If your birthday is already passed this year
    if (nextBirthday.getTime() < new Date().getTime()) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    message.reply(
      `Keep calm... there are ${dayLeft(nextBirthday)} days until your birthday.`
    );
  }
};

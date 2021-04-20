const service = require("../libraries/service");

module.exports = async (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);
  // bot.user.setActivity("RuneScape", { type: "PLAYING" });

  //Start services
  service.create(bot);
};

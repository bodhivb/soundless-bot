const { Guilds } = require("../libraries/constants");
const service = require("../libraries/service");
const slash = require("../libraries/slash");

module.exports = async (bot) => {
  console.log(`Logged in as ${bot.user.tag}`);
  // bot.user.setActivity("RuneScape", { type: "PLAYING" });

  //Start services
  service.create(bot);

  //Start slash commands for soundless
  slash.registerCommand(bot, Guilds.SL);
  slash.start(bot);
};

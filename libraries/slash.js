const fs = require("fs");

class Slash {
  // Loads each slash command in "slashCommands" folder
  load(bot) {
    fs.readdir("./slashCommands/", (err, files) => {
      console.log("Loading slash commands...");
      if (err) return console.log(`Error while loading slash commands. ${err}`);

      //Only js code may be loaded
      const jsfiles = files.filter((f) => f.endsWith(".js"));
      if (jsfiles.length <= 0) {
        return console.log("Couldn't find slash commands");
      }

      jsfiles.forEach((file, i) => {
        delete require.cache[require.resolve(`../slashCommands/${file}`)];
        const slash = require(`../slashCommands/${file}`);

        const slashName = slash.config.name;
        bot.slash.set(slashName, slash);
        console.log(`Loaded slash command ${slashName} (${file})`);
      });
    });
  }

  reload(bot) {
    bot.slash.clear();
    this.load(bot);
  }

  registerCommand(bot, guildId) {
    bot.slash.forEach((command) => {
      this.getApp(bot, guildId).commands.post({ data: { ...command.config } });
      console.log(`${command.config.name} slash has been registered`);
    });
  }

  getApp = (bot, guildId) => bot.api.applications(bot.user.id).guilds(guildId);

  start(bot) {
    console.log("Enabled slash");
    bot.ws.on("INTERACTION_CREATE", async (interaction) => {
      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;

      const slash = bot.slash.get(command);
      if (slash) slash.run(bot, interaction, args);
    });
  }
}

module.exports = new Slash();

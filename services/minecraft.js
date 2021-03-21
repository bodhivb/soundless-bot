const fs = require("fs");
const { database } = require("../libraries/database");
const { getMinecraftEmbed } = require("../libraries/minecraft");

module.exports = class MinecraftService {
  constructor(bot) {
    this.bot = bot;

    this.refreshMCStatus();
    setInterval(() => this.refreshMCStatus(), 1 * 60 * 1000);
  }

  refreshMCStatus() {
    fs.readdir("./datas/guilds/", (err, files) => {
      files.forEach(async (file, i) => {
        if (fs.lstatSync(`./datas/guilds/${file}`).isDirectory()) {
          const guild = database.getGuild(file);
          const mcData = guild.getMCStatus();

          if (mcData) {
            try {
              const channel = this.bot.channels.cache.get(mcData.channelId);
              const message = await channel.messages.fetch(mcData.messageId);
              await message.edit(await getMinecraftEmbed(mcData));
            } catch (ex) {
              console.log(ex);
            }
          }
        }
      });
    });
  }
};

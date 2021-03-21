const fs = require("fs");
const { dayLeft } = require("./common");
const { database } = require("./database");
const { getMinecraftEmbed } = require("./minecraft");

module.exports = class Service {
  constructor(bot) {
    this.bot = bot;

    this.refreshMCStatus();
    setInterval(() => this.refreshMCStatus(), 1 * 60 * 1000);

    this.checkBirthday();
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

  checkBirthday() {
    fs.readdir("./datas/users/", (err, files) => {
      files.forEach(async (file, i) => {
        const userId = file.replace(".json", "");
        const user = database.getUser(userId);
        const bday = user.getBirthday() ? new Date(user.getBirthday()) : undefined;

        if (bday) {
          //Add time to fix day time zone
          let nextBirthday = new Date(
            new Date().getFullYear(),
            bday.getMonth(),
            bday.getDate(),
            bday.getHours(),
            bday.getMinutes()
          );

          if (dayLeft(nextBirthday) === 0) {
            const guild = this.bot.guilds.cache.get("417434577443880974");
            if (guild) {
              const member = guild.members.cache.get(userId);

              //Apply temp role
              const birthRole = guild.roles.cache.find((r) =>
                r.name.toLowerCase().includes("birthday")
              );
              if (birthRole) {
                member.roles.add(birthRole.id);
              }

              //Send message
              const channel = guild.channels.cache.find(
                (c) => c.type === "text" && c.name.toLowerCase().includes("lounge")
              );

              if (channel) {
                const age = new Date().getFullYear() - bday.getFullYear();
                channel.send(
                  [
                    `Happy birthday ${member}! 🎉🎊`,
                    `You just go turned to **${age}** years old! Enjoy your day!`,
                    ``,
                    `XOXO from Soundless Esports 💙`,
                  ].join("\n")
                );
              }
            }
          }
        }
      });
    });
  }
};

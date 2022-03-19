const fs = require("fs");
const { database } = require("../libraries/database");
const { dayLeft } = require("../libraries/common");
const { Guilds, Channels } = require("../libraries/constants");

module.exports = class BirthdayService {
  constructor(bot) {
    this.bot = bot;

    this.guildWhitelist = Guilds.SL;

    //this.checkBirthday();
    this.setNewTimeout();
  }

  //Set new job for next day
  setNewTimeout() {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0);

    setTimeout(() => {
      this.checkBirthday();
      this.setNewTimeout();
    }, nextDay - new Date());
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
            const guild = this.bot.guilds.cache.get(this.guildWhitelist);
            if (guild) {
              const member = guild.members.cache.get(userId);
              if (member) {
                const age = new Date().getFullYear() - bday.getFullYear();

                this.setRole(guild, member);
                this.sendMessage(guild, member, age);
              }
            }
          }
        }
      });
    });
  }

  //Apply birthday role
  async setRole(guild, member) {
    let birthRole = await guild.roles.cache.find((r) =>
      r.name.toLowerCase().includes("birthday")
    );

    if (!birthRole) {
      birthRole = await this.createRole(guild);
    }

    member.roles.add(birthRole.id);

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    database.getGuild(guild.id).addTempRole(birthRole.id, member.id, nextDay);
  }

  //Setting up the birthday role
  async createRole(guild) {
    const birthRole = await guild.roles.create({
      data: {
        name: "Birthday",
        color: "#08eaff",
        permissions: [],
        hoist: true,
      },
      reason: "Give birthday roll to feel special for one day",
    });

    //Set role to highest position
    let botMember = await guild.members.fetch(guild.me.id);
    await birthRole.setPosition(botMember.roles.highest.position - 1);

    return birthRole;
  }

  //Send birthday message to channel
  sendMessage(guild, member, age) {
    const channel = guild.channels.cache.get(Channels.GENERAL);

    if (channel) {
      channel.send(
        {
          content: [
            `Happy birthday ${member}! 🎉🎊`,
            `Today you just turned **${age}**! Enjoy your day!`,
            ``,
            `XOXO from Soundless Esports 💙`,
          ].join("\n")
        }
      );
    }
  }
};

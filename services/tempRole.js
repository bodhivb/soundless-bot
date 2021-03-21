const fs = require("fs");
const { database } = require("../libraries/database");

module.exports = class TempRoleService {
  constructor(bot) {
    this.bot = bot;

    this.checkExpiredRole();
    //Every 1 hour
    setInterval(() => this.checkExpiredRole(), 60 * 60 * 1000);
  }

  checkExpiredRole() {
    const now = new Date();

    fs.readdir("./datas/guilds/", (err, files) => {
      files.forEach(async (file, i) => {
        if (fs.lstatSync(`./datas/guilds/${file}`).isDirectory()) {
          const guild = database.getGuild(file);
          const tempRoles = guild.getTempRoles();

          if (tempRoles && tempRoles.length > 0) {
            for (let i = tempRoles.length - 1; i >= 0; i--) {
              if (new Date(tempRoles[i].expireAt).getTime() < now.getTime()) {
                this.removeRoleFromGuild(
                  guild.id,
                  tempRoles[i].roleId,
                  tempRoles[i].userId
                );
                tempRoles.splice(i, 1);
              }
            }
          }

          guild.saveTempRoles(tempRoles);
        }
      });
    });
  }

  async removeRoleFromGuild(guildId, roleId, userId) {
    const guild = await this.bot.guilds.cache.get(guildId);
    if (guild) {
      const member = await guild.members.fetch(userId);
      if (member) member.roles.remove(roleId);
    }
  }
};

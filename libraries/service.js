const BirthdayService = require("../services/birthday");
const MinecraftService = require("../services/minecraft");
const TempRoleService = require("../services/tempRole");

class Service {
  create(bot) {
    //Fill services here to become active at startup

    this.birthdayService = new BirthdayService(bot);
    this.minecraftService = new MinecraftService(bot);
    this.tempRoleService = new TempRoleService(bot);
  }
}

module.exports = new Service();

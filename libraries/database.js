const fs = require("fs");
const GuildData = require("./guildData");
const UserData = require("./userData");

class Database {
  constructor() {
    //Load server

    if (!fs.existsSync("./datas/")) fs.mkdirSync("./datas/");
    if (!fs.existsSync("./datas/guilds/")) fs.mkdirSync("./datas/guilds/");
    if (!fs.existsSync("./datas/users/")) fs.mkdirSync("./datas/users/");

    fs.readdir("./datas/guilds/", (err, files) => {
      console.log("Loading guilds data...");
    });
  }

  getGuild(id) {
    return new GuildData(id);
  }

  getUser(id) {
    return new UserData(id);
  }
}

module.exports.database = new Database();

const fs = require("fs");
const GuildData = require("./guildData");

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
}

module.exports.database = new Database();

const fs = require("fs");

module.exports = class GuildData {
  constructor(_id) {
    this.id = _id;

    if (!fs.existsSync(`./datas/guilds/${this.id}/`))
      fs.mkdirSync(`./datas/guilds/${this.id}/`);
  }

  getMCStatus() {
    return this.fileRead("mc-status.json");
  }

  saveMCStatus(data) {
    this.fileWrite("mc-status.json", data);
  }

  /** Basic function */
  isFileExists(fileName) {
    return fs.existsSync(`./datas/guilds/${this.id}/${fileName}`);
  }

  fileRead(fileName) {
    return this.isFileExists(fileName)
      ? JSON.parse(
          fs.readFileSync(`./datas/guilds/${this.id}/${fileName}`, { encoding: "utf-8" })
        )
      : undefined;
  }

  fileWrite(fileName, data) {
    if (this.isFileExists(fileName)) {
      fs.unlinkSync(`./datas/guilds/${this.id}/${fileName}`);
    }

    fs.writeFileSync(`./datas/guilds/${this.id}/${fileName}`, JSON.stringify(data), {
      encoding: "utf-8",
    });
  }
};

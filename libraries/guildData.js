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

  getGifs() {
    return this.fileRead("gifs.json");
  }

  addGif(name, url) {
    let data = this.getGifs();
    if (data && data.findIndex((d) => d.name === name) >= 0) {
      //Already exist
      return false;
    }
    if (data) {
      data.push({ name, url });
    } else {
      data = [{ name, url }];
    }

    this.fileWrite("gifs.json", data);
    return true;
  }

  deleteGif(name) {
    let data = this.getGifs();
    if (!data) return;

    const i = data.findIndex((d) => d.name === name);
    if (i >= 0) {
      data.splice(i, 1);
      this.fileWrite("gifs.json", data);
      return true;
    }
    return false;
  }

  getTempRoles() {
    return this.fileRead("temp-role.json");
  }

  addTempRole(roleId, userId, expireAt) {
    let data = this.getTempRoles();

    if (data && Object.keys(data).length) {
      data.push({ roleId, userId, expireAt });
    } else {
      data = [{ roleId, userId, expireAt }];
    }

    this.fileWrite("temp-role.json", data);
  }

  saveTempRoles(data) {
    this.fileWrite("temp-role.json", data);
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

    fs.writeFileSync(
      `./datas/guilds/${this.id}/${fileName}`,
      JSON.stringify(data ? data : {}),
      {
        encoding: "utf-8",
      }
    );
  }
};

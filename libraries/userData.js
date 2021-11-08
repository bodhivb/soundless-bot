const fs = require("fs");

module.exports = class UserData {
  constructor(_id) {
    this.id = _id;
    this.user = this.fileRead();
  }

  getBirthday() {
    return this.user && this.user.birthday ? this.user.birthday : undefined;
  }

  setBirthday(bday) {
    if (this.user) {
      this.user.birthday = bday;
    } else {
      this.user = { birthday: bday };
    }

    this.fileWrite(this.user);
  }

  deleteBirthday() {
    if (this.user && this.user.birthday) {
      delete this.user.birthday;
      this.fileWrite(this.user);
      return true;
    }
    return false;
  }

  /** Basic function */

  isFileExists() {
    return fs.existsSync(`./datas/users/${this.id}.json`);
  }

  fileRead() {
    return this.isFileExists()
      ? JSON.parse(
          fs.readFileSync(`./datas/users/${this.id}.json`, { encoding: "utf-8" })
        )
      : undefined;
  }

  fileWrite(data) {
    if (this.isFileExists()) {
      fs.unlinkSync(`./datas/users/${this.id}.json`);
    }

    fs.writeFileSync(`./datas/users/${this.id}.json`, JSON.stringify(data), {
      encoding: "utf-8",
    });
  }
};

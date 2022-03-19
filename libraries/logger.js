const util = require("util");
const { Channels } = require("./constants");

module.exports = (bot) => {
  var loggerTime;
  var loggerMessage = "```";

  process.on("uncaughtException", (err) => {
    console.error(err);
  });

  console.info = function () {
    const message = util.format.apply(null, arguments) + "\n";
    process.stdout.write(`\x1b[32m${message}\x1b[0m`);
    loggerMessage += message;
    SendTimeOut();
  };

  console.log = function () {
    const message = util.format.apply(null, arguments) + "\n";
    process.stdout.write(message);
    loggerMessage += message;
    SendTimeOut();
  };

  console.error = function () {
    const message = util.format.apply(null, arguments) + "\n";
    process.stdout.write(`\x1b[31m${message}\x1b[0m`);
    loggerMessage += message;
    SendTimeOut();
  };

  async function SendTimeOut() {
    if (loggerTime) {
      clearTimeout(loggerTime);
      loggerTime = null;
    }

    loggerTime = setTimeout(async () => {
      try {
        await (await bot.channels.cache.get(Channels.CONSOLE)).send({
          content:
            loggerMessage + "```"
        });
      } catch {}
      loggerMessage = "```";
    }, 1000);
  }
};

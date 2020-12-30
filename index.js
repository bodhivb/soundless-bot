const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const prefix = config.prefix;
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

// Load all commands
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  var jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.lengte <= 0) {
    return console.log("Couldn't find commands");
  }

  jsfiles.forEach((f, i) => {
    delete require.cache[require.resolve(`./commands/${f}`)]; //for reload
    let cmds = require(`./commands/${f}`);
    bot.commands.set(cmds.config.name, cmds);
    console.log(`${f} loaded`);
  });
});

//
bot.on("message", async (message) => {
  if (!message.content.startsWith(prefix)) return;

  let messageArray = message.content.slice(prefix.length + 1).split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  let commandFile = bot.commands.get(command);
  if (commandFile) commandFile.run(bot, message, args);
});

bot.on("ready", () => {
  console.log(`Logged in as '${bot.user.tag}'!`);
});

bot.login(config.token);

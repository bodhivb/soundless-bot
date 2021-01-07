const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

// Loads each command in "commands" folder
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  //Only js code may be loaded
  const jsfiles = files.filter((f) => f.endsWith(".js"));
  if (jsfiles.length <= 0) {
    return console.log("Couldn't find commands");
  }

  jsfiles.forEach((f, i) => {
    delete require.cache[require.resolve(`./commands/${f}`)]; //for reload
    const command = require(`./commands/${f}`);
    bot.commands.set(command.config.name, command);
    console.log(`${f} loaded`);
  });
});

// Handling an incoming message
bot.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length + 1).split(" ");
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName);
  if (command) command.run(bot, message, args);
});

bot.on("ready", () => {
  console.log(`Logged in as '${bot.user.tag}'`);
});

// Start discord server
bot.login(token);

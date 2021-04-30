const fs = require("fs");
const Discord = require("discord.js");
const { token } = require("./config.json");
const slash = require("./libraries/slash");

const bot = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
bot.commands = new Discord.Collection();
bot.slash = new Discord.Collection();

// Loads each command in "commands" folder
fs.readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Error while loading commands. ${err}`);

  //Only js code may be loaded
  const jsfiles = files.filter((f) => f.endsWith(".js"));
  if (jsfiles.length <= 0) {
    return console.log("Couldn't find commands");
  }

  jsfiles.forEach((file, i) => {
    delete require.cache[require.resolve(`./commands/${file}`)]; //for reload
    const command = require(`./commands/${file}`);
    const commandName = command.config.name;
    bot.commands.set(commandName, command);
    console.log(`Loaded command ${commandName} (${file})`);
  });
});

// Loads each event in "events" folder
fs.readdir("./events/", (err, files) => {
  console.log("Loading events...");
  if (err) return console.log(`Error while loading events. ${err}`);

  files.forEach((file, i) => {
    const event = require(`./events/${file}`);
    const eventName = file.substr(0, file.indexOf("."));
    bot.on(eventName, event.bind(null, bot));
    console.log(`Loaded event ${eventName} (${file})`);
  });
});

// Load slash commands
slash.load(bot);

// Start discord server
bot.login(token);

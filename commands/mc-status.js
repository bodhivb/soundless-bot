const Discord = require("discord.js");
const util = require("minecraft-server-util");
const { authorId } = require("../config.json");

module.exports.config = {
  name: "mc-status",
  description: "Check Minecraft server status",
  usage: "mc-status [ipaddres:port]",
};

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== authorId) return;

  if (!args[0])
    return message.channel.send("This command require one command line argument");

  let host = args[0];
  let port = 25565;

  if (host.includes(":")) {
    host = args[0].split(":")[0];
    port = Number(args[0].split(":")[1]);
  }

  util
    .status(host, { port })
    .then((response) => {
      let msg = new Discord.MessageEmbed()
        .setTitle("Minecraft server")
        .setColor(3447003)
        .addField("IP Address: ", response.host)
        .addField("Online players: ", response.onlinePlayers + "/" + response.maxPlayers)
        .addField("Version: ", response.version)
        .addField("Description: ", response.description.toRaw());

      //.setThumbnail(response.favicon);

      return message.channel.send(msg);
    })
    .catch((error) => {
      return message.channel.send("Error: " + error);
    });
};

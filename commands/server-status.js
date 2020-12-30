const Discord = require("discord.js");
const util = require("minecraft-server-util");

module.exports.config = {
  name: "server-status",
};

module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send("This command require one command line argument");

  util
    .status(args[0])
    .then((response) => {
      let msg = new Discord.MessageEmbed()
        .setTitle("Minecraft server")
        .setColor(3447003)
        .addField("IP Address: ", response.host)
        .addField("Online players: ", response.onlinePlayers + "/" + response.maxPlayers)
        .addField("Version: ", response.version)
        .addField("Description: ", response.description.toRaw());

      return message.channel.send(msg);
    })
    .catch((error) => {
      return message.channel.send("Error: " + error);
    });
};

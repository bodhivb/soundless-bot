const Discord = require("discord.js");
const util = require("minecraft-server-util");
const { Emojis } = require("./constants");

const getMinecraftEmbed = async (mcStatus) => {
  const embed = new Discord.MessageEmbed();

  embed.setTitle("Minecraft server" + Array(70).join(" ") + "\u200B");
  embed.setColor("#008E44");

  // Minecraft status need 4 field, so it can take up to 6 different server (24/25 fields)
  for (const mc of mcStatus.server) {
    const name = mc.name && mc.name !== "" ? mc.name : mc.host;

    try {
      const res = await util.status(mc.host, { port: mc.port });
      const hostname = mc.host + (mc.port === 25565 ? "" : ":" + mc.port);

      embed.addField(
        Emojis.MINECRAFT + " " + name,
        res.description.toRaw() + "\nIP: `" + hostname + "`"
      );
      embed.addField("Status", "Online", true);
      embed.addField("Players", res.onlinePlayers + "/" + res.maxPlayers, true);
      embed.addField("Version", res.version + "\n\u200B", true);
    } catch {
      embed.addField(Emojis.OFFLINE + " " + name, "Server is offline");
    }
  }

  embed.setFooter("Last updated");
  embed.setTimestamp();

  return embed;
};
module.exports.getMinecraftEmbed = getMinecraftEmbed;

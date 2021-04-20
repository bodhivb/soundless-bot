const { database } = require("../libraries/database");
const { getMinecraftEmbed } = require("../libraries/minecraft");
const { authorId } = require("../config.json");

module.exports.config = {
  name: "mc-add",
  description: "Add Minecraft server",
  usage: "mc-add [ipaddres:port] [name]",
};

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== authorId) return;
  //TODO Only for guilds, not DM

  //Server host:port
  let host = args[0];
  let port = 25565;

  if (host.includes(":")) {
    host = args[0].split(":")[0];
    port = Number(args[0].split(":")[1]);
  }

  //Server name
  let name = args.slice(1).join(" ");

  const msg = await message.channel.send({
    embed: { description: "Adding `" + host + "` to server list... :hourglass:" },
  });

  //Get data
  const guild = database.getGuild(message.guild.id);
  let mcStatus = guild.getMCStatus();

  if (mcStatus) {
    try {
      // Check if message is still there
      const channel = message.guild.channels.cache.get(mcStatus.channelId);
      const statusMessage = await channel.messages.fetch(mcStatus.messageId);

      mcStatus.server.push({ name, host, port });

      await statusMessage.edit(await getMinecraftEmbed(mcStatus));

      guild.saveMCStatus(mcStatus);
      msg.edit({
        embed: {
          description:
            "`" + host + "` has been successfully added in " + channel.toString(),
        },
      });
      return;
    } catch {}
  }

  mcStatus = {
    channelId: message.channel.id,
    messageId: msg.id,
    server: [{ name, host, port }],
  };

  guild.saveMCStatus(mcStatus);
  await msg.edit(await getMinecraftEmbed(mcStatus));
};

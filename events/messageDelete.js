module.exports = async (bot, message) => {
  if (message.channel.type == "dm") return;

  //Search log channel
  const logChannel = message.guild.channels.cache.find(
    (channel) => channel.name === "delete-log"
  );

  if (logChannel)
    logChannel.send({ content: `${message.author.username}'s message is deleted -> ${message}` });
};

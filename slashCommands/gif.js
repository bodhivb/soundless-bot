const { Guilds } = require("../libraries/constants");
const { database } = require("../libraries/database");

const getGifsDatabase = () => {
  const guild = database.getGuild(Guilds.SL);
  const gifs = guild.getGifs();
  if (gifs) {
    return gifs.map((gif) => ({ name: gif.name, value: gif.url }));
  } else {
    return [];
  }
};

module.exports.config = {
  name: "gif",
  description: "Search Soundless Esports GIFs",
  options: [
    {
      type: 3,
      name: "name",
      description: "The gif you want to express.",
      required: true,
      choices: getGifsDatabase(),
    },
  ],
};

module.exports.run = async (bot, interaction, args) => {
  if (args && args.length) {
    return reply(bot, interaction, args[0].value);
  }

  return reply(bot, interaction, "Invalid args");
};

const reply = async (bot, interaction, response) => {
  let data = { content: response };

  if (typeof response === "object") {
    data = await createAPIMessage(interaction, response);
  }

  bot.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data,
    },
  });
};

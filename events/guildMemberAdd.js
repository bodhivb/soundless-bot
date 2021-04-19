const { Guilds } = require("../libraries/constants");
const service = require("../libraries/service");

module.exports = async (bot, member) => {
  const guild = member.guild;

  if (guild.id === Guilds.SL) {
    service.guildStatusService.refreshMemberCount();
  }
};

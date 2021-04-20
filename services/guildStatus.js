const { Guilds, Channels } = require("../libraries/constants");

module.exports = class GuildStatusService {
  constructor(bot) {
    this.bot = bot;

    //Only for Soundless Esports guild
    this.refreshMemberCount();
  }

  async refreshMemberCount() {
    try {
      const guild = await this.bot.guilds.cache.get(Guilds.SL);
      const channel = await guild.channels.cache.get(Channels.MEMBER_COUNT);

      await channel.setName(`「👤」Members: ${guild.memberCount.toString()}`);
    } catch (ex) {
      console.log(ex);
    }
  }
};

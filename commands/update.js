const { exec } = require("child_process");
const { authorId } = require("../config.json");

module.exports.config = {
  name: "update",
  description: "Fetch git and restart bot",
  usage: "update",
};

module.exports.run = async (bot, message, args) => {
  if (message.author.id === authorId) {
    const msg = await message.channel.send({ content: "Git fetching..." });

    //Git pull force
    exec("git fetch --all && git reset --hard origin/production", async (err) => {
      if (err) return msg.edit("Git fetch failed. " + err);

      //Log last commit
      exec("git log --name-status --oneline  -1", async (err, stdout, stderr) => {
        if (!err) await message.channel.send({ content: "```Commit: " + stdout + "```" });

        await msg.edit("Git fetch successful, restart bot.");
        process.exit(0);
      });
    });
  } else {
    message.reply({ content: "You do not have permission to run this command." });
  }
};

/*CMD
  command: admin_fj_remove
  help:
  need_reply: false
  folder: ADMIN
  aliases:
CMD*/

var ownerId = Bot.getProperty("t5_owner");

if (!ownerId || String(user.telegramid) != String(ownerId)) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var channels = Bot.getProperty("fj_channels", []);

if (!channels || channels.length == 0) {
  Bot.sendMessage("No Force Join channels to remove.");
  return;
}

var kb = [];

for (var i = 0; i < channels.length; i++) {
  kb.push([
    {
      title: "❌ " + (channels[i].title || channels[i].username),
      command: "admin_fj_remove_do " + i
    }
  ]);
}

kb.push([{ title: "⬅️ Back", command: "admin_fj" }]);

Bot.sendInlineKeyboard(kb, "➖ *REMOVE CHANNEL*\n\nSelect a channel:");
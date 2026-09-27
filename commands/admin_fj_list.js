/*CMD
  command: admin_fj_list
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
var text = "📋 *FORCE JOIN CHANNELS*\n━━━━━━━━━━━━━━\n\n";

if (!channels || channels.length == 0) {
  text += "No channels added yet.";
} else {
  for (var i = 0; i < channels.length; i++) {
    text += (i + 1) + ". " + (channels[i].title || channels[i].username) + " — `" + channels[i].username + "`\n";
  }
}

Bot.sendInlineKeyboard(
  [[{ title: "⬅️ Back", command: "admin_fj" }]],
  text
);
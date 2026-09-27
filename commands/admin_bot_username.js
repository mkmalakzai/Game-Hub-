/*CMD
  command: admin_bot_username
  help:
  need_reply: false
  folder: ADMIN
  aliases:
CMD*/

var ownerId = String(Bot.getProperty("t5_owner") || "");
if (String(user.telegramid) !== ownerId) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var current = String(Bot.getProperty("t5_bot_username") || "");

Bot.sendMessage(
  "🤖 *BOT USERNAME*\n━━━━━━━━━━━━━━\n\n" +
  "Current: *" + (current ? "@" + current : "Not configured") + "*\n\n" +
  "Send this bot's username without @.\nExample: GameHubPro005Bot\n\n" +
  "This is used only to generate dynamic invite/deep links."
);
Bot.run({command:"admin_bot_username_save"});
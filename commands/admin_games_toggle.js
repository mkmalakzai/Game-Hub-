/*CMD
  command: admin_games_toggle
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

var status = Bot.getProperty("t5_games_enabled", "yes");
Bot.setProperty("t5_games_enabled", status=="yes" ? "no" : "yes", "string");
Bot.runCommand("admin_games");
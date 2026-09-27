/*CMD
  command: admin_reset_board
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

Bot.setProperty("t5_leaderboard", [], "json");
Bot.sendMessage("✅ Leaderboard reset.");
Bot.runCommand("admin_settings");
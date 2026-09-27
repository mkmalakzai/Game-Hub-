/*CMD
  command: admin_stats
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

var users = Bot.getProperty("t5_users", []);
var board = Bot.getProperty("t5_leaderboard", []);
var fj = Bot.getProperty("fj_enabled", "yes");
var games = Bot.getProperty("t5_games_enabled", "yes");

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Admin Panel",command:"admin_panel"}]],
  "📊 *BOT STATISTICS*\n━━━━━━━━━━━━━━\n\n" +
  "👥 Users: *" + users.length + "*\n" +
  "🏆 Ranked Players: *" + board.length + "*\n" +
  "📢 Force Join: *" + (fj=="yes" ? "ON" : "OFF") + "*\n" +
  "🎮 Games: *" + (games=="yes" ? "ON" : "OFF") + "*"
);
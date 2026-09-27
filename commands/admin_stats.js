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
var totalGames = Number(Bot.getProperty("t5_total_games") || 0);
var totalWins = Number(Bot.getProperty("t5_total_wins") || 0);
var totalLosses = Number(Bot.getProperty("t5_total_losses") || 0);
var totalRewards = Number(Bot.getProperty("t5_total_coin_rewards") || 0);
var fj = Bot.getProperty("fj_enabled", "yes");
var games = Bot.getProperty("t5_games_enabled", "yes");

var decided = totalWins + totalLosses;
var winRate = decided > 0 ? ((totalWins / decided) * 100).toFixed(1) : "0.0";

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Admin Panel",command:"admin_panel"}]],
  "📊 *PLATFORM STATISTICS*\n" +
  "━━━━━━━━━━━━━━\n\n" +
  "👥 Registered Users: *" + users.length + "*\n" +
  "🏆 Ranked Players: *" + board.length + "*\n" +
  "🎮 Total Games: *" + totalGames + "*\n" +
  "✅ Player Wins: *" + totalWins + "*\n" +
  "💥 Player Losses: *" + totalLosses + "*\n" +
  "📈 Global Win Rate: *" + winRate + "%*\n" +
  "🪙 Game Rewards Issued: *" + totalRewards + "* Coins\n\n" +
  "📢 Force Join: *" + (fj=="yes" ? "ON" : "OFF") + "*\n" +
  "🕹 Game System: *" + (games=="yes" ? "ON" : "OFF") + "*"
);
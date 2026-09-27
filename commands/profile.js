/*CMD
  command: profile
  help:
  need_reply: false
  folder: PROFILE
  aliases:
CMD*/

var coins = Libs.ResourcesLib.userRes("coins").value();
var xp = Libs.ResourcesLib.userRes("xp").value();
var wins = Libs.ResourcesLib.userRes("wins").value();
var losses = Libs.ResourcesLib.userRes("losses").value();

var level = Math.floor(xp / 100) + 1;
var played = wins + losses;
var winRate = played > 0 ? ((wins / played) * 100).toFixed(1) : "0.0";

Bot.sendInlineKeyboard(
  [[{ title: "⬅️ Main Menu", command: "main_menu" }]],
  "👤 *PLAYER PROFILE*\n━━━━━━━━━━━━━━\n\n" +
  "🪙 Coins: *" + coins + "*\n" +
  "⭐ XP: *" + xp + "*\n" +
  "📈 Level: *" + level + "*\n" +
  "🎮 Games Played: *" + played + "*\n" +
  "🏆 Wins: *" + wins + "*\n" +
  "💥 Losses: *" + losses + "*\n" +
  "📊 Win Rate: *" + winRate + "%*"
);
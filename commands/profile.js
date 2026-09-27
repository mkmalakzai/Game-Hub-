/*CMD
  command: profile
  help:
  need_reply: false
  folder: PROFILE
  aliases:
CMD*/

var coins = Math.floor(Libs.ResourcesLib.userRes("coins").value());
var xp = Math.floor(Libs.ResourcesLib.userRes("xp").value());
var wins = Math.floor(Libs.ResourcesLib.userRes("wins").value());
var losses = Math.floor(Libs.ResourcesLib.userRes("losses").value());

var level = 1;
var floorXp = 0;
var nextXp = 250;

while (xp >= nextXp) {
  level += 1;
  floorXp = nextXp;
  nextXp += level * 250;
}

var span = nextXp - floorXp;
var progress = xp - floorXp;
var pct = span > 0 ? Math.floor((progress / span) * 100) : 0;
if (pct > 100) pct = 100;

var filled = Math.floor(pct / 10);
var bar = "";
for (var i=0; i<10; i++) {
  bar += i < filled ? "▰" : "▱";
}

var played = Number(User.getProperty("t5_games_played") || (wins + losses));
var winRate = (wins + losses) > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : "0.0";
var streak = Number(User.getProperty("t5_win_streak") || 0);
var best = Number(User.getProperty("t5_best_streak") || 0);

Bot.sendInlineKeyboard(
  [[{ title: "⬅️ Main Menu", command: "main_menu" }]],
  "👤 *PLAYER PROFILE*\n" +
  "━━━━━━━━━━━━━━\n\n" +
  "🎖 Level *" + level + "*\n" +
  bar + " *" + pct + "%*\n" +
  "⭐ " + xp + " / " + nextXp + " XP\n\n" +
  "🪙 Coins: *" + coins + "*\n" +
  "🎮 Games Played: *" + played + "*\n" +
  "🏆 Wins: *" + wins + "*\n" +
  "💥 Losses: *" + losses + "*\n" +
  "📊 Win Rate: *" + winRate + "%*\n" +
  "🔥 Current Streak: *" + streak + "*\n" +
  "👑 Best Streak: *" + best + "*"
);
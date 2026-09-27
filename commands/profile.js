/*CMD
  command: profile
  help:
  need_reply: false
  folder: PROFILE
  aliases:
CMD*/

var uid = String(user.telegramid);
var coins = Number(Bot.getProperty("t5_balance_" + uid) || 0);
var xp = Number(Bot.getProperty("t5_xp_" + uid) || 0);
var wins = Number(Bot.getProperty("t5_wins_" + uid) || 0);
var losses = Number(Bot.getProperty("t5_losses_" + uid) || 0);
var played = Number(Bot.getProperty("t5_games_" + uid) || (wins + losses));

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
for (var i=0; i<10; i++) bar += i < filled ? "▰" : "▱";

var winRate = played > 0 ? ((wins / played) * 100).toFixed(1) : "0.0";

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Main Menu",command:"main_menu"}]],
  "👤 *PLAYER PROFILE*\n━━━━━━━━━━━━━━\n\n" +
  "🎖 Level *" + level + "*\n" +
  bar + " *" + pct + "%*\n" +
  "⭐ " + xp + " / " + nextXp + " XP\n\n" +
  "🪙 Coins: *" + coins + "*\n" +
  "🎮 Games Played: *" + played + "*\n" +
  "🏆 Wins: *" + wins + "*\n" +
  "💥 Losses: *" + losses + "*\n" +
  "📊 Win Rate: *" + winRate + "%*"
);
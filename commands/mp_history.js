/*CMD
  command: mp_history
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var history = Bot.getProperty("t5_history_" + uid, []);
var coins = Number(Bot.getProperty("t5_balance_" + uid) || 0);
var xp = Number(Bot.getProperty("t5_xp_" + uid) || 0);

var text =
  "📜 *MATCH HISTORY*\n━━━━━━━━━━━━━━\n\n" +
  "🪙 Balance: *" + coins + "*\n" +
  "⭐ XP: *" + xp + "*\n\n";

if (!history.length) {
  text += "No completed matches yet.";
} else {
  for (var i=0; i<history.length && i<10; i++) {
    var h = history[i];
    var icon = h.result=="win" ? "🏆" : h.result=="loss" ? "💥" : h.result=="draw" ? "🤝" : "•";
    text += icon + " *" + h.reason + "*";
    if (h.opponent) text += " vs *" + h.opponent + "*";
    text += "\n   " + (h.coins >= 0 ? "+" : "") + h.coins + " Coins • " +
      (h.xp >= 0 ? "+" : "") + h.xp + " XP\n";
  }
}

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Multiplayer",command:"multiplayer"}]],
  text
);
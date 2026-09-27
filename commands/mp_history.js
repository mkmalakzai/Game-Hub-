/*CMD
  command: mp_history
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var history = Bot.getProperty("t5_mp_history_" + uid, []);
var extCoins = Number(Bot.getProperty("t5_ext_coins_" + uid) || 0);
var extXp = Number(Bot.getProperty("t5_ext_xp_" + uid) || 0);

var text =
  "📜 *MULTIPLAYER HISTORY*\n" +
  "━━━━━━━━━━━━━━\n\n" +
  "🪙 Multiplayer Coins: *" + extCoins + "*\n" +
  "⭐ Multiplayer XP: *" + extXp + "*\n\n";

if (!history.length) {
  text += "No completed multiplayer matches yet.";
} else {
  for (var i=0; i<history.length && i<10; i++) {
    var h = history[i];
    var icon = h.result=="win" ? "🏆" : h.result=="loss" ? "💥" : "🤝";
    text += icon + " vs *" + h.opponent + "*\n";
    text += "   " + (h.coins >= 0 ? "+" : "") + h.coins + " Coins • " +
      (h.xp >= 0 ? "+" : "") + h.xp + " XP\n";
  }
}

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Multiplayer",command:"multiplayer"}]],
  text
);
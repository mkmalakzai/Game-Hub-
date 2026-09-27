/*CMD
  command: mp_history
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var history = User.getProperty("t5_score_history", []);
var text = "📜 *RECENT SCORE CHANGES*\n━━━━━━━━━━━━━━\n\n";

if (!history.length) {
  text += "No multiplayer score history yet.";
} else {
  for (var i=0;i<history.length && i<10;i++) {
    var h = history[i];
    text += "• *" + h.reason + "* — " +
      (h.coins >= 0 ? "+" : "") + h.coins + " Coins, " +
      (h.xp >= 0 ? "+" : "") + h.xp + " XP\n";
  }
}

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Multiplayer",command:"multiplayer"}]],
  text
);
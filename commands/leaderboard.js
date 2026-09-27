/*CMD
  command: leaderboard
  help:
  need_reply: false
  folder: LEADERBOARD
  aliases:
CMD*/

var top = Bot.getProperty("t5_leaderboard", []);
var text = "🏆 *GLOBAL LEADERBOARD*\n━━━━━━━━━━━━━━\n\n";

if (!top || top.length == 0) {
  text += "No ranked players yet. Win games to enter the board.";
} else {
  for (var i = 0; i < top.length && i < 10; i++) {
    var row = top[i];
    var rank = (i + 1) + ".";
    if (i == 0) rank = "🥇";
    if (i == 1) rank = "🥈";
    if (i == 2) rank = "🥉";

    text += rank + " *" + row.name + "*\n";
    text += "   🏆 " + Number(row.wins || 0) + " wins • ⭐ " + Number(row.xp || 0) + " XP\n";
  }

  text += "\n_Ties are ranked by XP._";
}

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Main Menu",command:"main_menu"}]],
  text
);
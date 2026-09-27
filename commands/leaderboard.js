/*CMD
  command: leaderboard
  help:
  need_reply: false
  folder: LEADERBOARD
  aliases:
CMD*/

var top = Bot.getProperty("t5_leaderboard", []);
var text = "🏆 *LEADERBOARD*\n━━━━━━━━━━━━━━\n\n";

if (!top || top.length == 0) {
  text += "No ranked players yet. Win games to appear here.";
} else {
  for (var i = 0; i < top.length && i < 10; i++) {
    var row = top[i];
    text += (i + 1) + ". " + row.name + " — *" + row.wins + " wins*\n";
  }
}

Bot.sendInlineKeyboard([[{title:"⬅️ Main Menu",command:"main_menu"}]], text);
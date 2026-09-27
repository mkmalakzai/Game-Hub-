/*CMD
  command: leaderboard
  help:
  need_reply: false
  folder: LEADERBOARD
  aliases:
CMD*/

var users = Bot.getProperty("t5_users", []);
var rows = [];

for (var i=0; i<users.length; i++) {
  var uid = String(users[i]);
  var name = String(Bot.getProperty("t5_name_" + uid) || ("Player " + uid));
  var wins = Number(Bot.getProperty("t5_wins_" + uid) || 0);
  var xp = Number(Bot.getProperty("t5_xp_" + uid) || 0);

  if (wins > 0 || xp > 0) {
    rows.push({id:uid,name:name,wins:wins,xp:xp});
  }
}

rows.sort(function(a,b){
  if (b.wins == a.wins) return b.xp - a.xp;
  return b.wins - a.wins;
});

var text = "🏆 *GLOBAL LEADERBOARD*\n━━━━━━━━━━━━━━\n\n";

if (!rows.length) {
  text += "No ranked players yet.";
} else {
  for (var r=0; r<rows.length && r<10; r++) {
    var rank = (r+1) + ".";
    if (r==0) rank = "🥇";
    if (r==1) rank = "🥈";
    if (r==2) rank = "🥉";

    text += rank + " *" + rows[r].name + "*\n";
    text += "   🏆 " + rows[r].wins + " wins • ⭐ " + rows[r].xp + " XP\n";
  }
}

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Main Menu",command:"main_menu"}]],
  text
);
/*CMD
  command: game_reward
  help:
  need_reply: false
  folder: SYSTEM
  aliases:
CMD*/

var data = {};
try { data = JSON.parse(params || "{}"); } catch(e) { data = {}; }

var win = data.win === true;
var coins = Number(data.coins || (win ? 15 : 3));
var xp = Number(data.xp || (win ? 10 : 3));

Libs.ResourcesLib.userRes("coins").add(coins);
Libs.ResourcesLib.userRes("xp").add(xp);

if (win) {
  Libs.ResourcesLib.userRes("wins").add(1);
} else {
  Libs.ResourcesLib.userRes("losses").add(1);
}

var games = Number(User.getProperty("t5_games_played") || 0) + 1;
User.setProperty("t5_games_played", games, "integer");

var uid = String(user.telegramid);
var name = user.first_name || user.username || ("Player " + uid);
var board = Bot.getProperty("t5_leaderboard", []);
var found = false;

for (var i = 0; i < board.length; i++) {
  if (String(board[i].id) == uid) {
    board[i].wins = Libs.ResourcesLib.userRes("wins").value();
    board[i].name = name;
    found = true;
    break;
  }
}

if (!found) {
  board.push({ id: uid, name: name, wins: Libs.ResourcesLib.userRes("wins").value() });
}

board.sort(function(a,b){ return Number(b.wins) - Number(a.wins); });
if (board.length > 50) board = board.slice(0,50);
Bot.setProperty("t5_leaderboard", board, "json");
/*CMD
  command: game_reward
  help:
  need_reply: false
  folder: SYSTEM
  aliases:
CMD*/

var data = {};
try { data = JSON.parse(params || "{}"); } catch(e) { data = {}; }

var result = String(data.result || (data.win === true ? "win" : "loss"));
var coins = Number(data.coins || 0);
var xp = Number(data.xp || 0);

if (coins > 0) {
  Libs.ResourcesLib.userRes("coins").add(coins);
}
if (xp > 0) {
  Libs.ResourcesLib.userRes("xp").add(xp);
}

var wins = Libs.ResourcesLib.userRes("wins");
var losses = Libs.ResourcesLib.userRes("losses");

var streak = Number(User.getProperty("t5_win_streak") || 0);
var best = Number(User.getProperty("t5_best_streak") || 0);

if (result == "win") {
  wins.add(1);
  streak += 1;
  if (streak > best) {
    best = streak;
    User.setProperty("t5_best_streak", best, "integer");
  }
} else if (result == "loss") {
  losses.add(1);
  streak = 0;
}

User.setProperty("t5_win_streak", streak, "integer");

var games = Number(User.getProperty("t5_games_played") || 0) + 1;
User.setProperty("t5_games_played", games, "integer");

var earned = Number(User.getProperty("t5_game_coins_earned") || 0) + coins;
User.setProperty("t5_game_coins_earned", earned, "integer");

var uid = String(user.telegramid);
var name = user.first_name || user.username || ("Player " + uid);
var board = Bot.getProperty("t5_leaderboard", []);
var found = false;

for (var i = 0; i < board.length; i++) {
  if (String(board[i].id) == uid) {
    board[i].wins = wins.value();
    board[i].name = name;
    board[i].xp = Libs.ResourcesLib.userRes("xp").value();
    found = true;
    break;
  }
}

if (!found) {
  board.push({
    id: uid,
    name: name,
    wins: wins.value(),
    xp: Libs.ResourcesLib.userRes("xp").value()
  });
}

board.sort(function(a,b){
  if (Number(b.wins) == Number(a.wins)) {
    return Number(b.xp || 0) - Number(a.xp || 0);
  }
  return Number(b.wins) - Number(a.wins);
});

if (board.length > 50) {
  board = board.slice(0,50);
}

Bot.setProperty("t5_leaderboard", board, "json");
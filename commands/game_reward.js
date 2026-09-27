/*CMD
  command: game_reward
  help:
  need_reply: false
  folder: SYSTEM
  aliases:
CMD*/

var data = {};
try { data = JSON.parse(params || "{}"); } catch(e) { data = {}; }

var result = String(data.result || "");
var coins = Number(data.coins || 0);
var xp = Number(data.xp || 0);
var coinMultiplier = Number(Bot.getProperty("t5_coin_multiplier") || 1);
var xpMultiplier = Number(Bot.getProperty("t5_xp_multiplier") || 1);

if (coins > 0) coins = Math.max(1, Math.floor(coins * coinMultiplier));
if (xp > 0) xp = Math.max(1, Math.floor(xp * xpMultiplier));

var wins = result == "win" ? 1 : 0;
var losses = result == "loss" ? 1 : 0;

Bot.runCommand("balance_apply " + JSON.stringify({
  uid:String(user.telegramid),
  coins:coins,
  xp:xp,
  wins:wins,
  losses:losses,
  result:result,
  reason:data.reason || "Game"
}));

var streak = Number(User.getProperty("t5_win_streak") || 0);
var best = Number(User.getProperty("t5_best_streak") || 0);

if (result == "win") {
  streak += 1;
  if (streak > best) {
    best = streak;
    User.setProperty("t5_best_streak", best, "integer");
  }
} else if (result == "loss") {
  streak = 0;
}

User.setProperty("t5_win_streak", streak, "integer");

Bot.setProperty("t5_total_games", Number(Bot.getProperty("t5_total_games") || 0) + 1, "integer");
Bot.setProperty("t5_total_coin_rewards", Number(Bot.getProperty("t5_total_coin_rewards") || 0) + coins, "integer");

if (result == "win") {
  Bot.setProperty("t5_total_wins", Number(Bot.getProperty("t5_total_wins") || 0) + 1, "integer");
}
if (result == "loss") {
  Bot.setProperty("t5_total_losses", Number(Bot.getProperty("t5_total_losses") || 0) + 1, "integer");
}

var uid = String(user.telegramid);
var name = user.first_name || user.username || ("Player " + uid);
var board = Bot.getProperty("t5_leaderboard", []);
var found = false;
var w = Number(Bot.getProperty("t5_wins_" + uid) || 0);
var x = Number(Bot.getProperty("t5_xp_" + uid) || 0);

for (var i=0;i<board.length;i++) {
  if (String(board[i].id) == uid) {
    board[i].name = name;
    board[i].wins = w;
    board[i].xp = x;
    found = true;
    break;
  }
}

if (!found) board.push({id:uid,name:name,wins:w,xp:x});

board.sort(function(a,b){
  if (Number(b.wins) == Number(a.wins)) return Number(b.xp||0)-Number(a.xp||0);
  return Number(b.wins)-Number(a.wins);
});

if (board.length > 50) board = board.slice(0,50);
Bot.setProperty("t5_leaderboard", board, "json");
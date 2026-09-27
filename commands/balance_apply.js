/*CMD
  command: balance_apply
  help:
  need_reply: false
  folder: SYSTEM
  aliases:
CMD*/

var data = {};
try { data = JSON.parse(params || "{}"); } catch(e) { data = {}; }

var uid = String(data.uid || user.telegramid);
var coins = Number(data.coins || 0);
var xp = Number(data.xp || 0);
var wins = Number(data.wins || 0);
var losses = Number(data.losses || 0);
var reason = String(data.reason || "Game");
var opponent = String(data.opponent || "");
var result = String(data.result || "");

var coinKey = "t5_balance_" + uid;
var xpKey = "t5_xp_" + uid;
var winsKey = "t5_wins_" + uid;
var lossesKey = "t5_losses_" + uid;
var gamesKey = "t5_games_" + uid;
var histKey = "t5_history_" + uid;

var c = Number(Bot.getProperty(coinKey) || 0);
var x = Number(Bot.getProperty(xpKey) || 0);
var w = Number(Bot.getProperty(winsKey) || 0);
var l = Number(Bot.getProperty(lossesKey) || 0);
var g = Number(Bot.getProperty(gamesKey) || 0);

c += coins;
x += xp;
w += wins;
l += losses;
if (result) g += 1;

if (c < 0) c = 0;
if (x < 0) x = 0;

Bot.setProperty(coinKey, c, "integer");
Bot.setProperty(xpKey, x, "integer");
Bot.setProperty(winsKey, w, "integer");
Bot.setProperty(lossesKey, l, "integer");
Bot.setProperty(gamesKey, g, "integer");

var hist = Bot.getProperty(histKey, []);
hist.unshift({
  time: Date.now(),
  reason: reason,
  opponent: opponent,
  result: result,
  coins: coins,
  xp: xp
});
if (hist.length > 30) hist = hist.slice(0,30);
Bot.setProperty(histKey, hist, "json");
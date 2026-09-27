/*CMD
  command: score_change
  help:
  need_reply: false
  folder: SYSTEM
  aliases:
CMD*/

var data = {};
try { data = JSON.parse(params || "{}"); } catch(e) { data = {}; }

var coins = Number(data.coins || 0);
var xp = Number(data.xp || 0);

var coinRes = Libs.ResourcesLib.userRes("coins");
var xpRes = Libs.ResourcesLib.userRes("xp");

if (coins !== 0) {
  if (coins < 0 && coinRes.value() + coins < 0) {
    coins = -coinRes.value();
  }
  coinRes.add(coins);
}

if (xp !== 0) {
  if (xp < 0 && xpRes.value() + xp < 0) {
    xp = -xpRes.value();
  }
  xpRes.add(xp);
}

var history = User.getProperty("t5_score_history", []);
history.unshift({
  time: Date.now(),
  coins: coins,
  xp: xp,
  reason: data.reason || "Game"
});

if (history.length > 20) {
  history = history.slice(0,20);
}

User.setProperty("t5_score_history", history, "json");
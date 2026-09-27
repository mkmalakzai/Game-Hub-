/*CMD
  command: mp_resolve
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var matchId = String(params || "");
var match = Bot.getProperty("t5_mp_" + matchId);

if (!match || match.status !== "active") {
  return;
}

var a = match.p1_move;
var b = match.p2_move;
var winner = "draw";

if (
  (a=="attack" && b=="power") ||
  (a=="guard" && b=="attack") ||
  (a=="power" && b=="guard")
) {
  winner = "p1";
} else if (a !== b) {
  winner = "p2";
}

match.status = "finished";
match.winner = winner;
match.finished = Date.now();
Bot.setProperty("t5_mp_" + matchId, match, "json");

var p1Coins = 0, p1Xp = 1, p2Coins = 0, p2Xp = 1;
var p1Result = "draw", p2Result = "draw";

if (winner == "p1") {
  p1Coins = 6; p1Xp = 4; p1Result = "win";
  p2Coins = -3; p2Xp = -1; p2Result = "loss";
}
if (winner == "p2") {
  p2Coins = 6; p2Xp = 4; p2Result = "win";
  p1Coins = -3; p1Xp = -1; p1Result = "loss";
}

function settle(uid, coins, xp, result, opponent, move, otherMove) {
  var coinKey = "t5_ext_coins_" + uid;
  var xpKey = "t5_ext_xp_" + uid;
  var histKey = "t5_mp_history_" + uid;

  var c = Number(Bot.getProperty(coinKey) || 0) + coins;
  var x = Number(Bot.getProperty(xpKey) || 0) + xp;

  if (c < 0) c = 0;
  if (x < 0) x = 0;

  Bot.setProperty(coinKey, c, "integer");
  Bot.setProperty(xpKey, x, "integer");

  var hist = Bot.getProperty(histKey, []);
  hist.unshift({
    match: matchId,
    result: result,
    opponent: opponent,
    coins: coins,
    xp: xp,
    move: move,
    opponent_move: otherMove,
    time: Date.now()
  });
  if (hist.length > 20) hist = hist.slice(0,20);
  Bot.setProperty(histKey, hist, "json");
}

settle(String(match.p1), p1Coins, p1Xp, p1Result, match.p2_name || match.p2, a, b);
settle(String(match.p2), p2Coins, p2Xp, p2Result, match.p1_name || match.p1, b, a);

var uid = String(user.telegramid);
var iAmP1 = uid === String(match.p1);
var mine = iAmP1 ? p1Result : p2Result;
var coins = iAmP1 ? p1Coins : p2Coins;
var xp = iAmP1 ? p1Xp : p2Xp;
var myMove = iAmP1 ? a : b;
var otherMove = iAmP1 ? b : a;

Bot.sendInlineKeyboard(
  [
    [{title:"📜 Match History",command:"mp_history"}],
    [{title:"🌐 Multiplayer",command:"multiplayer"}]
  ],
  "⚔️ *MULTIPLAYER RESULT*\n━━━━━━━━━━━━━━\n\n" +
  "Your move: *" + myMove.toUpperCase() + "*\n" +
  "Opponent: *" + otherMove.toUpperCase() + "*\n\n" +
  (mine=="draw"
    ? "🤝 *DRAW*\n+1 XP"
    : mine=="win"
      ? "🏆 *VICTORY*\n+6 Coins • +4 XP"
      : "💥 *DEFEAT*\n-3 Coins • -1 XP")
);
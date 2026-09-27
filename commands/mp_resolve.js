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

var uid = String(user.telegramid);
var iAmP1 = uid === String(match.p1);
var iWon = (winner === "p1" && iAmP1) || (winner === "p2" && !iAmP1);
var isDraw = winner === "draw";

if (isDraw) {
  Bot.runCommand("score_change " + JSON.stringify({coins:0,xp:1,reason:"Multiplayer Draw"}));
} else if (iWon) {
  Bot.runCommand("score_change " + JSON.stringify({coins:6,xp:4,reason:"Multiplayer Win"}));
} else {
  Bot.runCommand("score_change " + JSON.stringify({coins:-3,xp:-1,reason:"Multiplayer Loss"}));
}

Bot.sendInlineKeyboard(
  [[{title:"🌐 Multiplayer",command:"multiplayer"}]],
  "⚔️ *MULTIPLAYER RESULT*\n━━━━━━━━━━━━━━\n\n" +
  "Your move: *" + (iAmP1 ? a : b).toUpperCase() + "*\n" +
  "Opponent: *" + (iAmP1 ? b : a).toUpperCase() + "*\n\n" +
  (isDraw ? "🤝 *DRAW*\n+1 XP" : iWon ? "🏆 *VICTORY*\n+6 Coins • +4 XP" : "💥 *DEFEAT*\n-3 Coins • -1 XP")
);
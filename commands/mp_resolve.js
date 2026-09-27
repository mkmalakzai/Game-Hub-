/*CMD
  command: mp_resolve
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var matchId = String(params || "");
var match = Bot.getProperty("t5_mp_" + matchId);

if (!match || match.status !== "active") return;

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

var p1 = {coins:0,xp:1,wins:0,losses:0,result:"draw"};
var p2 = {coins:0,xp:1,wins:0,losses:0,result:"draw"};

if (winner=="p1") {
  p1={coins:6,xp:4,wins:1,losses:0,result:"win"};
  p2={coins:-3,xp:-1,wins:0,losses:1,result:"loss"};
}
if (winner=="p2") {
  p2={coins:6,xp:4,wins:1,losses:0,result:"win"};
  p1={coins:-3,xp:-1,wins:0,losses:1,result:"loss"};
}

Bot.runCommand("balance_apply " + JSON.stringify({
  uid:String(match.p1),coins:p1.coins,xp:p1.xp,wins:p1.wins,losses:p1.losses,
  result:p1.result,reason:"Multiplayer Match",opponent:match.p2_name || match.p2
}));
Bot.runCommand("balance_apply " + JSON.stringify({
  uid:String(match.p2),coins:p2.coins,xp:p2.xp,wins:p2.wins,losses:p2.losses,
  result:p2.result,reason:"Multiplayer Match",opponent:match.p1_name || match.p1
}));

var uid = String(user.telegramid);
var mine = uid===String(match.p1) ? p1 : p2;
var myMove = uid===String(match.p1) ? a : b;
var otherMove = uid===String(match.p1) ? b : a;

Bot.sendInlineKeyboard(
  [
    [{title:"📜 Match History",command:"mp_history"}],
    [{title:"🌐 Multiplayer",command:"multiplayer"}]
  ],
  "⚔️ *MULTIPLAYER RESULT*\n━━━━━━━━━━━━━━\n\n" +
  "Your move: *" + myMove.toUpperCase() + "*\n" +
  "Opponent: *" + otherMove.toUpperCase() + "*\n\n" +
  (mine.result=="draw"
    ? "🤝 *DRAW*\n+1 XP"
    : mine.result=="win"
      ? "🏆 *VICTORY*\n+6 Coins • +4 XP"
      : "💥 *DEFEAT*\n-3 Coins • -1 XP")
);
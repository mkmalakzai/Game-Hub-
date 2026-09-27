/*CMD
  command: mp_show
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var matchId = String(params || "");
var match = Bot.getProperty("t5_mp_" + matchId);

if (!match) {
  Bot.sendMessage("❌ Match not found.");
  return;
}

var uid = String(user.telegramid);
var kb = [];

if (match.status === "pending" && uid === String(match.p2)) {
  kb.push([{title:"✅ Accept Challenge",command:"mp_join " + matchId}]);
}

if (match.status === "active" && (uid === String(match.p1) || uid === String(match.p2))) {
  kb.push([
    {title:"🗡 Attack",command:"mp_move " + matchId + " attack"},
    {title:"🛡 Guard",command:"mp_move " + matchId + " guard"}
  ]);
  kb.push([{title:"⚡ Power",command:"mp_move " + matchId + " power"}]);
}

kb.push([{title:"⬅️ Multiplayer",command:"multiplayer"}]);

Bot.sendInlineKeyboard(
  kb,
  "⚔️ *MATCH DETAILS*\n━━━━━━━━━━━━━━\n\n" +
  "ID: `" + matchId + "`\n" +
  "Host: *" + match.p1_name + "*\n" +
  "Opponent: *" + (match.p2_name || "Waiting...") + "*\n" +
  "Status: *" + String(match.status).toUpperCase() + "*"
);
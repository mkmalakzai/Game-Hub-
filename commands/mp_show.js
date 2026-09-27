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

Bot.sendInlineKeyboard(
  [
    [{title:"✅ Join Match",command:"mp_join " + matchId}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "⚔️ *PLAYER CHALLENGE*\n━━━━━━━━━━━━━━\n\nHost: *" + match.p1_name + "*\nStatus: *" + match.status.toUpperCase() + "*\n\nTap Join Match if this challenge is for you."
);
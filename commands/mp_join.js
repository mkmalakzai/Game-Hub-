/*CMD
  command: mp_join
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var matchId = String(params || "");
var match = Bot.getProperty("t5_mp_" + matchId);
var uid = String(user.telegramid);

if (!match || match.status !== "pending") {
  Bot.sendMessage("❌ This challenge is no longer available.");
  return;
}

if (uid !== String(match.p2)) {
  Bot.sendMessage("⛔ This challenge was created for another player.");
  return;
}

match.p2_name = user.first_name || user.username || uid;
match.status = "active";
Bot.setProperty("t5_mp_" + matchId, match, "json");
Bot.setProperty("t5_mp_inbox_" + uid, "", "string");
Bot.setProperty("t5_last_match_" + uid, matchId, "string");

Bot.sendInlineKeyboard(
  [
    [
      {title:"🗡 Attack",command:"mp_move " + matchId + " attack"},
      {title:"🛡 Guard",command:"mp_move " + matchId + " guard"}
    ],
    [{title:"⚡ Power",command:"mp_move " + matchId + " power"}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "⚔️ *CHALLENGE ACCEPTED*\n━━━━━━━━━━━━━━\n\nMatch: `" + matchId + "`\n\nChoose your move."
);
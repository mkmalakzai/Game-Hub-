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

if (!match || (match.status !== "pending" && match.status !== "invite")) {
  Bot.sendMessage("❌ This challenge is no longer available.");
  return;
}

if (uid === String(match.p1)) {
  Bot.sendMessage("❌ You can't accept your own challenge.");
  return;
}

if (match.status === "pending" && uid !== String(match.p2)) {
  Bot.sendMessage("⛔ This challenge was created for another player.");
  return;
}

if (match.status === "invite") {
  match.p2 = uid;
}

match.p2_name = user.first_name || user.username || uid;
match.status = "active";

Bot.setProperty("t5_mp_" + matchId, match, "json");
Bot.setProperty("t5_mp_inbox_" + uid, "", "string");
Bot.setProperty("t5_last_match_" + uid, matchId, "string");
Bot.setProperty("t5_last_match_" + String(match.p1), matchId, "string");

var kb = [
  [{title:"🗡 Attack",command:"mp_move " + matchId + " attack"},{title:"🛡 Guard",command:"mp_move " + matchId + " guard"}],
  [{title:"⚡ Power",command:"mp_move " + matchId + " power"}],
  [{title:"⬅️ Multiplayer",command:"multiplayer"}]
];

Bot.sendInlineKeyboard(
  kb,
  "⚔️ *CHALLENGE ACCEPTED*\n━━━━━━━━━━━━━━\n\nOpponent: *" + match.p1_name + "*\n\nChoose your move."
);

Api.sendMessage({
  chat_id: match.p1,
  text: "⚔️ *CHALLENGE ACCEPTED*\n━━━━━━━━━━━━━━\n\nOpponent: *" + match.p2_name + "*\n\nOpen Multiplayer → Match Details or use your latest match.",
  parse_mode:"Markdown"
});
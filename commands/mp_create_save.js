/*CMD
  command: mp_create_save
  help:
  need_reply: true
  folder: MULTIPLAYER
  aliases:
CMD*/

var target = String(message || "").trim();
var me = String(user.telegramid);

if (!/^\d+$/.test(target)) {
  Bot.sendMessage("❌ Invalid user ID.");
  return;
}

if (target === me) {
  Bot.sendMessage("❌ You can't challenge yourself.");
  return;
}

var matchId = me + "_" + target + "_" + Date.now();

Bot.setProperty("t5_mp_" + matchId, {
  id: matchId,
  p1: me,
  p2: target,
  p1_name: user.first_name || user.username || me,
  p1_move: "",
  p2_move: "",
  status: "pending",
  created: Date.now()
}, "json");

Bot.setProperty("t5_last_match_" + me, matchId, "string");

Bot.sendInlineKeyboard(
  [
    [{title:"📋 Match Details",command:"mp_show " + matchId}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "✅ *CHALLENGE CREATED*\n━━━━━━━━━━━━━━\n\nChallenge ID:\n`" + matchId + "`\n\nShare this ID with your opponent."
);
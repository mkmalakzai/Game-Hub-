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
  Bot.sendMessage("❌ *INVALID USER ID*\n\nSend only the Telegram numeric ID.");
  return;
}

if (target === me) {
  Bot.sendMessage("❌ You can't challenge yourself.");
  return;
}

var users = Bot.getProperty("t5_users", []);
if (users.indexOf(target) === -1) {
  Bot.sendMessage("⚠️ *PLAYER NOT FOUND*\n\nThat user must start GameHub Pro once before receiving challenges.");
  return;
}

var matchId = "M" + Date.now() + "_" + me.substr(-4) + target.substr(-4);

Bot.setProperty("t5_mp_" + matchId, {
  id: matchId,
  p1: me,
  p2: target,
  p1_name: user.first_name || user.username || me,
  p2_name: "",
  p1_move: "",
  p2_move: "",
  status: "pending",
  created: Date.now()
}, "json");

Bot.setProperty("t5_mp_inbox_" + target, matchId, "string");
Bot.setProperty("t5_last_match_" + me, matchId, "string");

Bot.sendInlineKeyboard(
  [
    [{title:"📋 Match Details",command:"mp_show " + matchId}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "✅ *CHALLENGE CREATED*\n━━━━━━━━━━━━━━\n\nMatch ID: `" + matchId + "`\nOpponent ID: `" + target + "`\n\nThe opponent can open *Multiplayer → Pending Challenge* or enter this Match ID."
);
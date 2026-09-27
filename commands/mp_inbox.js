/*CMD
  command: mp_inbox
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var matchId = String(Bot.getProperty("t5_mp_inbox_" + uid) || "");

if (!matchId) {
  Bot.sendInlineKeyboard(
    [[{title:"⬅️ Multiplayer",command:"multiplayer"}]],
    "📥 *PENDING CHALLENGE*\n━━━━━━━━━━━━━━\n\nNo pending challenge right now."
  );
  return;
}

Bot.runCommand("mp_show " + matchId);
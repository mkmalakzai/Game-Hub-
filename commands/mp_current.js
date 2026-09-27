/*CMD
  command: mp_current
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var matchId = String(Bot.getProperty("t5_last_match_" + uid) || "");

if (!matchId) {
  Bot.sendInlineKeyboard([[{title:"⬅️ Multiplayer",command:"multiplayer"}]],"⚔️ *CURRENT MATCH*\n━━━━━━━━━━━━━━\n\nYou don't have an active or recent match.");
  return;
}

Bot.runCommand("mp_show " + matchId);
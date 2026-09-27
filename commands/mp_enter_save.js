/*CMD
  command: mp_enter_save
  help:
  need_reply: true
  folder: MULTIPLAYER
  aliases:
CMD*/

var matchId = String(message || "").trim();
var match = Bot.getProperty("t5_mp_" + matchId);

if (!match) {
  Bot.sendMessage("❌ Match not found. Check the ID and try again.");
  return;
}

Bot.runCommand("mp_show " + matchId);
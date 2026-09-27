/*CMD
  command: group_start
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var roomId = String(params || "");
var room = Bot.getProperty("t5_group_room_" + roomId);

if (!room || room.status !== "open") {
  Bot.sendMessage("❌ This group battle is unavailable.");
  return;
}

if (String(user.telegramid) !== String(room.host)) {
  Bot.sendMessage("⛔ Only the host can start this battle.");
  return;
}

if (room.players.length < 2) {
  Bot.sendMessage("⚠️ At least 2 players are required.");
  return;
}

room.status = "rolling";
Bot.setProperty("t5_group_room_" + roomId, room, "json");

Bot.sendInlineKeyboard(
  [[{title:"🎲 Roll Now",command:"group_roll " + roomId}]],
  "🎲 *GROUP BATTLE STARTED*\n━━━━━━━━━━━━━━\n\n" +
  "Players: *" + room.players.length + "*\n\n" +
  "Every joined player must tap *Roll Now*.\n" +
  "Highest roll wins. One roll per player."
);
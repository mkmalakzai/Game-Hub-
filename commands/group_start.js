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
  Bot.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Only the host can start this battle.",
    show_alert: true
  });
  return;
}

if (room.players.length < 2) {
  Bot.answerCallbackQuery({
    callback_query_id: request.id,
    text: "At least 2 players are required.",
    show_alert: true
  });
  return;
}

room.status = "rolling";
Bot.setProperty("t5_group_room_" + roomId, room, "json");

Bot.sendInlineKeyboard(
  [[{title:"🎲 Roll Now",command:"group_roll " + roomId}]],
  "🎲 *GROUP BATTLE STARTED*\n━━━━━━━━━━━━━━\n\n" +
  "Players: *" + room.players.length + "*\n\n" +
  "Every player must tap *Roll Now*.\n" +
  "Highest roll wins. Ties are replayed."
);
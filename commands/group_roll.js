/*CMD
  command: group_roll
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var roomId = String(params || "");
var room = Bot.getProperty("t5_group_room_" + roomId);

if (!room || room.status !== "rolling") {
  Bot.sendMessage("❌ This battle isn't accepting rolls.");
  return;
}

var uid = String(user.telegramid);
var found = -1;

for (var i=0; i<room.players.length; i++) {
  if (String(room.players[i].id) === uid) {
    found = i;
    break;
  }
}

if (found < 0) {
  Bot.answerCallbackQuery({
    callback_query_id: request.id,
    text: "You are not in this battle.",
    show_alert: true
  });
  return;
}

if (Number(room.players[found].roll || 0) > 0) {
  Bot.answerCallbackQuery({
    callback_query_id: request.id,
    text: "You already rolled.",
    show_alert: false
  });
  return;
}

var roll = Math.floor(Math.random()*100)+1;
room.players[found].roll = roll;
Bot.setProperty("t5_group_room_" + roomId, room, "json");

Bot.answerCallbackQuery({
  callback_query_id: request.id,
  text: "Your roll: " + roll,
  show_alert: true
});

var allDone = true;
for (var j=0; j<room.players.length; j++) {
  if (Number(room.players[j].roll || 0) <= 0) {
    allDone = false;
    break;
  }
}

if (allDone) {
  Bot.runCommand("group_resolve " + roomId);
}
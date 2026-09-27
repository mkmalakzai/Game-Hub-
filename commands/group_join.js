/*CMD
  command: group_join
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var roomId = String(params || "");
var room = Bot.getProperty("t5_group_room_" + roomId);

if (!room || room.status !== "open") {
  Bot.sendMessage("❌ This group battle is no longer open.");
  return;
}

var uid = String(user.telegramid);
var name = user.first_name || user.username || uid;

for (var i=0; i<room.players.length; i++) {
  if (String(room.players[i].id) === uid) {
    return;
  }
}

room.players.push({id:uid,name:name,roll:0});
Bot.setProperty("t5_group_room_" + roomId, room, "json");

Bot.sendMessage(
  "👥 *" + name + "* joined the battle.\nPlayers: *" + room.players.length + "*"
);
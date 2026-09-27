/*CMD
  command: group_game
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var type = chat && chat.chat_type ? String(chat.chat_type) : "";

if (type !== "group" && type !== "supergroup") {
  Bot.sendInlineKeyboard(
    [[{title:"⬅️ Multiplayer",command:"multiplayer"}]],
    "👥 *GROUP BATTLE*\n━━━━━━━━━━━━━━\n\nAdd GameHub Pro to a Telegram group and run this command there."
  );
  return;
}

var activeKey = "t5_group_active_" + String(chat.id);
var existingId = String(Bot.getProperty(activeKey) || "");

if (existingId) {
  var existing = Bot.getProperty("t5_group_room_" + existingId);
  if (existing && existing.status == "open") {
    Bot.sendInlineKeyboard(
      [
        [{title:"➕ Join Battle",command:"group_join " + existingId}],
        [{title:"▶️ Start Battle",command:"group_start " + existingId}]
      ],
      "👥 *GROUP BATTLE LOBBY*\n━━━━━━━━━━━━━━\n\nAn active lobby already exists in this group.\nPlayers: *" + existing.players.length + "*"
    );
    return;
  }
}

var roomId = "G" + Date.now() + "_" + String(chat.id).replace("-","");
var hostId = String(user.telegramid);

var room = {
  id: roomId,
  chat_id: String(chat.id),
  host: hostId,
  host_name: user.first_name || user.username || hostId,
  players: [{
    id: hostId,
    name: user.first_name || user.username || hostId,
    roll: 0
  }],
  status: "open",
  created: Date.now()
};

Bot.setProperty("t5_group_room_" + roomId, room, "json");
Bot.setProperty(activeKey, roomId, "string");

Bot.sendInlineKeyboard(
  [
    [{title:"➕ Join Battle",command:"group_join " + roomId}],
    [{title:"▶️ Start Battle",command:"group_start " + roomId}]
  ],
  "👥 *GROUP BATTLE LOBBY*\n━━━━━━━━━━━━━━\n\n" +
  "Host: *" + room.host_name + "*\n" +
  "Players: *1*\n" +
  "Status: *OPEN*\n\n" +
  "Members can join once. The host starts the battle when everyone is ready."
);
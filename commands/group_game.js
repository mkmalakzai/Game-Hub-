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
    "👥 *GROUP BATTLE*\n━━━━━━━━━━━━━━\n\nThis mode only works inside a Telegram group."
  );
  return;
}

var activeKey = "t5_group_active_" + String(chat.id);
var existingId = String(Bot.getProperty(activeKey) || "");

if (existingId) {
  var existing = Bot.getProperty("t5_group_room_" + existingId);
  if (existing && (existing.status == "open" || existing.status == "rolling")) {
    var kb = [];
    if (existing.status == "open") {
      kb.push([{title:"➕ Join Battle",command:"group_join " + existingId}]);
      kb.push([{title:"▶️ Start Battle",command:"group_start " + existingId}]);
    } else {
      kb.push([{title:"🎲 Roll Now",command:"group_roll " + existingId}]);
    }

    Bot.sendInlineKeyboard(
      kb,
      "👥 *GROUP BATTLE*\n━━━━━━━━━━━━━━\n\n" +
      "Status: *" + existing.status.toUpperCase() + "*\n" +
      "Players: *" + existing.players.length + "*\n\n" +
      "Use the buttons below."
    );
    return;
  }
}

var roomId = "G" + Date.now() + "_" + String(chat.id).replace(/-/g,"");
var hostId = String(user.telegramid);
var hostName = user.first_name || user.username || hostId;

var room = {
  id: roomId,
  chat_id: String(chat.id),
  host: hostId,
  host_name: hostName,
  players: [{id:hostId,name:hostName,roll:0}],
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
  "Host: *" + hostName + "*\n" +
  "Players: *1*\n" +
  "Status: *OPEN*\n\n" +
  "Members can join once. The host starts when everyone is ready."
);
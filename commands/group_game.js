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

var roomId = String(chat.id) + "_" + Date.now();

Bot.setProperty("t5_group_room_" + roomId, {
  id: roomId,
  chat_id: String(chat.id),
  host: String(user.telegramid),
  players: [{id:String(user.telegramid),name:user.first_name || user.username || String(user.telegramid)}],
  status: "open",
  created: Date.now()
}, "json");

Bot.sendInlineKeyboard(
  [
    [{title:"➕ Join Battle",command:"group_join " + roomId}],
    [{title:"▶️ Start Battle",command:"group_start " + roomId}]
  ],
  "👥 *GROUP BATTLE LOBBY*\n━━━━━━━━━━━━━━\n\nHost: *" + (user.first_name || "Player") + "*\nPlayers: *1*\n\nOther group members can tap *Join Battle*."
);
/*CMD
  command: group_challenge
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var type = chat && chat.chat_type ? String(chat.chat_type) : "";
if (type !== "group" && type !== "supergroup") {
  Bot.sendMessage("❌ Group Challenge can only be created inside a Telegram group.");
  return;
}

var uid = String(user.telegramid);
var matchId = "GC" + Date.now() + "_" + uid.substr(-5);

Bot.setProperty("t5_mp_" + matchId, {
  id:matchId,
  p1:uid,
  p2:"",
  p1_name:user.first_name || user.username || uid,
  p2_name:"",
  p1_move:"",
  p2_move:"",
  status:"invite",
  group_chat:String(chat.id),
  created:Date.now()
}, "json");

Bot.sendInlineKeyboard(
  [[{title:"⚔️ Accept Challenge",command:"mp_join " + matchId}]],
  "⚔️ *GROUP CHALLENGE*\n━━━━━━━━━━━━━━\n\n" +
  "*" + (user.first_name || user.username || "A player") + "* is looking for an opponent.\n\n" +
  "First other member to tap *Accept Challenge* gets the match."
);
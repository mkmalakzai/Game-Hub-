/*CMD
  command: mp_create
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var type = chat && chat.chat_type ? String(chat.chat_type) : "";
var botUsername = String(bot.name || "").replace("@","");

if (type == "group" || type == "supergroup") {
  Bot.sendInlineKeyboard(
    [
      [{title:"🎯 Create Group Challenge",command:"group_challenge"}],
      botUsername ? [{title:"📩 Direct Challenge",url:"https://t.me/" + botUsername + "?start=challenge"}] : []
    ],
    "⚔️ *CHALLENGE*\n━━━━━━━━━━━━━━\n\n" +
    "For someone in this group, use *Create Group Challenge*.\n" +
    "Any member can accept it — no Telegram ID needed.\n\n" +
    "For a private 1v1, open the bot and create a direct challenge."
  );
  return;
}

Bot.sendInlineKeyboard(
  [
    [{title:"🔗 Create Invite Challenge",command:"mp_invite"}],
    [{title:"🔢 Use Player ID",command:"mp_create_id"}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "⚔️ *CHALLENGE A PLAYER*\n━━━━━━━━━━━━━━\n\n" +
  "Recommended: create an invite challenge and share its link with your friend.\n" +
  "They only need to tap the link — no Telegram ID required."
);
/*CMD
  command: mp_create
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var type = chat && chat.chat_type ? String(chat.chat_type) : "";

if (type == "group" || type == "supergroup") {
  Bot.sendInlineKeyboard(
    [[{title:"📩 Open Private Chat",url:"https://t.me/" + bot.name}]],
    "⚔️ *PLAYER CHALLENGE*\n━━━━━━━━━━━━━━\n\nFor privacy and reliable input, create direct challenges in the bot's private chat."
  );
  return;
}

Bot.sendMessage(
  "⚔️ *CHALLENGE A PLAYER*\n━━━━━━━━━━━━━━\n\nSend the Telegram numeric user ID of the player you want to challenge.\n\nThe player must have started this bot at least once."
);

Bot.run({command:"mp_create_save"});
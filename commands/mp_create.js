/*CMD
  command: mp_create
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

Bot.sendMessage(
  "⚔️ *CHALLENGE A PLAYER*\n━━━━━━━━━━━━━━\n\nSend the Telegram numeric user ID of the player you want to challenge.\n\nThe player must have started this bot at least once."
);

Bot.run({command:"mp_create_save"});
/*CMD
  command: mp_create_id
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

Bot.sendMessage(
  "🔢 *CHALLENGE BY PLAYER ID*\n━━━━━━━━━━━━━━\n\n" +
  "Send the Telegram numeric ID.\n\n" +
  "Tip: this is an advanced option. Invite Challenge is easier."
);
Bot.run({command:"mp_create_save"});
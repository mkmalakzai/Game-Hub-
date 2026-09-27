/*CMD
  command: admin_fj_add
  help:
  need_reply: false
  folder: ADMIN
  aliases:
CMD*/

var ownerId = Bot.getProperty("t5_owner");

if (!ownerId || String(user.telegramid) != String(ownerId)) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

Bot.sendMessage(
  "➕ *ADD FORCE JOIN CHANNEL*\n━━━━━━━━━━━━━━\n\nSend the channel username like:\n`@yourchannel`\n\nThe bot must be admin in that channel."
);

Bot.run({ command: "admin_fj_add_save" });
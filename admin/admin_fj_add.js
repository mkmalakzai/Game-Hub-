/*
  command: admin_fj_add
  help:
  need_reply: false
  folder: ADMIN
*/

var ownerId = Bot.getProperty("owner_id");

if (!ownerId || String(user.telegramid) != String(ownerId)) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

Bot.sendMessage(
  "➕ *ADD FORCE JOIN CHANNEL*\n━━━━━━━━━━━━━━\n\nSend the channel username like:\n`@yourchannel`\n\nThe bot must be admin in that channel."
);

Bot.run({ command: "admin_fj_add_save" });
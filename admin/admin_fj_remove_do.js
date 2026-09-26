/*
  command: admin_fj_remove_do
  help:
  need_reply: false
  folder: ADMIN
*/

var ownerId = Bot.getProperty("owner_id");

if (!ownerId || String(user.telegramid) != String(ownerId)) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var index = parseInt(params);
var channels = Bot.getProperty("fj_channels", []);

if (isNaN(index) || index < 0 || index >= channels.length) {
  Bot.sendMessage("❌ Invalid channel.");
  return;
}

channels.splice(index, 1);
Bot.setProperty("fj_channels", channels, "json");

Bot.sendMessage("✅ Channel removed.");
Bot.runCommand("admin_fj");
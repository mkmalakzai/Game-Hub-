/*CMD
  command: admin_multiplayer_toggle
  help:
  need_reply: false
  folder: ADMIN
  aliases:
CMD*/

var ownerId = String(Bot.getProperty("t5_owner") || "");
if (String(user.telegramid) !== ownerId) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var enabled = Bot.getProperty("t5_multiplayer_enabled","yes");
Bot.setProperty("t5_multiplayer_enabled",enabled=="yes"?"no":"yes","string");
Bot.runCommand("admin_multiplayer");
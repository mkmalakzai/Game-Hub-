/*CMD
  command: admin_fj_toggle
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

var fj = Bot.getProperty("fj_enabled", "yes");
Bot.setProperty("fj_enabled", fj == "yes" ? "no" : "yes", "string");
Bot.runCommand("admin_fj");
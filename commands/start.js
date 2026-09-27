/*CMD
  command: /start
  help:
  need_reply: false
  folder: CORE
  aliases:
CMD*/

var banned = Bot.getProperty("user_banned_" + user.telegramid) == "yes";

if (banned) {
  Bot.sendMessage("🚫 ACCOUNT RESTRICTED\n\nYour access to this bot has been restricted by an administrator.");
  return;
}

var fjEnabled = Bot.getProperty("fj_enabled", "yes");

if (fjEnabled == "yes") {
  Bot.runCommand("force_join");
  return;
}

Bot.runCommand("main_menu");
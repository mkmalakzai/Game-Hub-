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

if (Bot.getProperty("t5_setup_done") !== "yes") {
  Bot.sendInlineKeyboard(
    [[{title:"⚙️ Setup",command:"/setup"}]],
    "🛠 *GAMEHUB PRO*\n━━━━━━━━━━━━━━\n\nThis bot is not configured yet."
  );
  return;
}

var uid = String(user.telegramid);
var users = Bot.getProperty("t5_users", []);

if (users.indexOf(uid) === -1) {
  users.push(uid);
  Bot.setProperty("t5_users", users, "json");
}

var fjEnabled = Bot.getProperty("fj_enabled", "yes");

if (fjEnabled == "yes") {
  Bot.runCommand("force_join");
  return;
}

Bot.runCommand("main_menu");
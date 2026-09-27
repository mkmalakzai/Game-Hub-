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

if (Bot.getProperty("t5_migrated_" + uid) != "yes") {
  var oldCoins = Math.floor(Libs.ResourcesLib.userRes("coins").value());
  var oldXp = Math.floor(Libs.ResourcesLib.userRes("xp").value());
  var oldWins = Math.floor(Libs.ResourcesLib.userRes("wins").value());
  var oldLosses = Math.floor(Libs.ResourcesLib.userRes("losses").value());

  var extCoins = Number(Bot.getProperty("t5_ext_coins_" + uid) || 0);
  var extXp = Number(Bot.getProperty("t5_ext_xp_" + uid) || 0);

  Bot.setProperty("t5_balance_" + uid, Math.max(0, oldCoins + extCoins), "integer");
  Bot.setProperty("t5_xp_" + uid, Math.max(0, oldXp + extXp), "integer");
  Bot.setProperty("t5_wins_" + uid, oldWins, "integer");
  Bot.setProperty("t5_losses_" + uid, oldLosses, "integer");
  Bot.setProperty("t5_games_" + uid, Number(User.getProperty("t5_games_played") || (oldWins + oldLosses)), "integer");
  Bot.setProperty("t5_migrated_" + uid, "yes", "string");
}

var fjEnabled = Bot.getProperty("fj_enabled", "yes");

if (fjEnabled == "yes") {
  Bot.runCommand("force_join");
  return;
}

Bot.runCommand("main_menu");
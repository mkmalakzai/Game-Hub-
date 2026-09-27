/*CMD
  command: admin_games
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

var status = Bot.getProperty("t5_games_enabled", "yes");

Bot.sendInlineKeyboard(
  [
    [{title: status=="yes" ? "❌ Disable Games" : "✅ Enable Games", command:"admin_games_toggle"}],
    [{title:"⬅️ Admin Panel",command:"admin_panel"}]
  ],
  "🎮 *GAME SETTINGS*\n━━━━━━━━━━━━━━\n\nStatus: *" + (status=="yes" ? "Enabled ✅" : "Disabled ❌") + "*"
);
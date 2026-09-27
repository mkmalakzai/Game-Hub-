/*CMD
  command: admin_multiplayer
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

Bot.sendInlineKeyboard(
  [
    [{title:enabled=="yes"?"❌ Disable Multiplayer":"✅ Enable Multiplayer",command:"admin_multiplayer_toggle"}],
    [{title:"⬅️ Admin Panel",command:"admin_panel"}]
  ],
  "🌐 *MULTIPLAYER CONTROL*\n━━━━━━━━━━━━━━\n\nStatus: *" + (enabled=="yes"?"ON ✅":"OFF ❌") + "*\n\nIncludes player challenges, quick match, and group battles."
);
/*
  command: admin_fj
  help:
  need_reply: false
  folder: ADMIN
*/

var ownerId = Bot.getProperty("owner_id");

if (!ownerId || String(user.telegramid) != String(ownerId)) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var fj = Bot.getProperty("fj_enabled", "yes");
var channels = Bot.getProperty("fj_channels", []);

Bot.sendInlineKeyboard(
  [
    [{ title: fj == "yes" ? "❌ Disable" : "✅ Enable", command: "admin_fj_toggle" }],
    [
      { title: "➕ Add Channel", command: "admin_fj_add" },
      { title: "➖ Remove Channel", command: "admin_fj_remove" }
    ],
    [{ title: "📋 View Channels", command: "admin_fj_list" }],
    [{ title: "⬅️ Admin Panel", command: "admin_panel" }]
  ],
  "📢 *FORCE JOIN SETTINGS*\n━━━━━━━━━━━━━━\n\nStatus: *" +
  (fj == "yes" ? "Enabled ✅" : "Disabled ❌") +
  "*\nChannels: *" + channels.length + "*"
);
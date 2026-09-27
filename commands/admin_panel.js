/*CMD
  command: admin_panel
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

Bot.sendInlineKeyboard(
  [
    [
      { title: "📢 Force Join", command: "admin_fj" },
      { title: "🎮 Games", command: "admin_games" }
    ],
    [
      { title: "👥 Users", command: "admin_users" },
      { title: "📊 Statistics", command: "admin_stats" }
    ],
    [
      { title: "⚙️ Settings", command: "admin_settings" }
    ]
  ],
  "🛠 *ADMIN PANEL*\n━━━━━━━━━━━━━━\n\nForce Join: *" + (fj == "yes" ? "ON ✅" : "OFF ❌") + "*"
);
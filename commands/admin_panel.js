/*CMD
  command: admin_panel
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

var fj = Bot.getProperty("fj_enabled", "yes");
var games = Bot.getProperty("t5_games_enabled", "yes");

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
    ],
    [
      { title: "🏠 Main Menu", command: "main_menu" }
    ]
  ],
  "🛠 *ADMIN PANEL*\n━━━━━━━━━━━━━━\n\n" +
  "📢 Force Join: *" + (fj == "yes" ? "ON ✅" : "OFF ❌") + "*\n" +
  "🎮 Games: *" + (games == "yes" ? "ON ✅" : "OFF ❌") + "*"
);
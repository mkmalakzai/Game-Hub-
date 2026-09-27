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
var users = Bot.getProperty("t5_users", []);
var totalGames = Number(Bot.getProperty("t5_total_games") || 0);

Bot.sendInlineKeyboard(
  [
    [
      { title: "🎮 Game Control", command: "admin_games" },
      { title: "💰 Economy", command: "admin_economy" }
    ],
    [
      { title: "🧠 Trivia", command: "admin_trivia" },
      { title: "📢 Force Join", command: "admin_fj" }
    ],
    [
      { title: "👥 Users", command: "admin_users" },
      { title: "📊 Statistics", command: "admin_stats" }
    ],
    [
      { title: "⚙️ Settings", command: "admin_settings" },
      { title: "📚 Documentation", command: "admin_docs" }
    ],
    [
      { title: "🏠 Main Menu", command: "main_menu" }
    ]
  ],
  "🛠 *GAMEHUB PRO • ADMIN*\n" +
  "━━━━━━━━━━━━━━\n\n" +
  "👥 Users: *" + users.length + "*\n" +
  "🎮 Games Played: *" + totalGames + "*\n" +
  "📢 Force Join: *" + (fj == "yes" ? "ON ✅" : "OFF ❌") + "*\n" +
  "🕹 Game System: *" + (games == "yes" ? "ON ✅" : "OFF ❌") + "*\n\n" +
  "Manage your entire gaming ecosystem below."
);
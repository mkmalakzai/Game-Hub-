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
    [{title: status=="yes" ? "⏸ Disable Game Center" : "▶️ Enable Game Center", command:"admin_games_toggle"}],
    [
      {title:"💰 Economy",command:"admin_economy"},
      {title:"🧠 Trivia",command:"admin_trivia"}
    ],
    [{title:"⬅️ Admin Panel",command:"admin_panel"}]
  ],
  "🎮 *GAME CONTROL CENTER*\n" +
  "━━━━━━━━━━━━━━\n\n" +
  "System Status: *" + (status=="yes" ? "ONLINE ✅" : "OFFLINE ❌") + "*\n\n" +
  "🎲 Dice Duel\n" +
  "🔢 Number Hunt\n" +
  "✊ RPS Arena\n" +
  "🪙 Coin Flip\n" +
  "🧠 Trivia Arena — 3 difficulties\n" +
  "⚔️ Arena Duel — tactical 3 HP battle\n\n" +
  "Use Economy to control overall progression speed."
);
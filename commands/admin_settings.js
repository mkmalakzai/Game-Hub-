/*CMD
  command: admin_settings
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

Bot.sendInlineKeyboard(
  [
    [
      {title:"💰 Economy",command:"admin_economy"},
      {title:"🎮 Game Control",command:"admin_games"}
    ],
    [
      {title:"📢 Force Join",command:"admin_fj"},
      {title:"🧠 Trivia",command:"admin_trivia"}
    ],
    [{title:"🧹 Reset Leaderboard",command:"admin_reset_board"}],
    [{title:"⬅️ Admin Panel",command:"admin_panel"}]
  ],
  "⚙️ *SYSTEM SETTINGS*\n━━━━━━━━━━━━━━\n\nTune GameHub Pro without editing code."
);
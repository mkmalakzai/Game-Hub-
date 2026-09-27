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
      {title:"📢 Force Join",command:"admin_fj"},
      {title:"🎮 Games",command:"admin_games"}
    ],
    [{title:"🧹 Reset Leaderboard",command:"admin_reset_board"}],
    [{title:"⬅️ Admin Panel",command:"admin_panel"}]
  ],
  "⚙️ *SETTINGS*\n━━━━━━━━━━━━━━\n\nManage the main GameHub systems."
);
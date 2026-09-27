/*CMD
  command: admin_docs
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
  [[{title:"⬅️ Admin Panel",command:"admin_panel"}]],
  "📚 *GAMEHUB PRO DOCUMENTATION*\n" +
  "━━━━━━━━━━━━━━\n\n" +
  "🎮 *GAME SYSTEM*\n" +
  "Six playable game modes with controlled rewards, XP progression and cooldowns.\n\n" +
  "⚔️ *ARENA DUEL*\n" +
  "Multi-round 3 HP tactical combat using Attack, Guard and Power.\n\n" +
  "🧠 *TRIVIA*\n" +
  "Easy, Medium and Hard banks with 24 questions and scaled rewards.\n\n" +
  "💰 *ECONOMY*\n" +
  "Use Slow, Balanced or Fast progression presets from Admin → Economy.\n\n" +
  "📢 *FORCE JOIN*\n" +
  "Supports multiple required channels with membership verification.\n\n" +
  "🏆 *PROGRESSION*\n" +
  "Coins, XP, levels, win rate, current streak, best streak and leaderboard.\n\n" +
  "⚙️ *OWNER ACCESS*\n" +
  "/setup initializes the owner. /admin opens this panel."
);
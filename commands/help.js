/*
  command: help
  help:
  need_reply: false
  folder: CORE
*/

Bot.sendInlineKeyboard(
  [[{ title: "⬅️ Main Menu", command: "main_menu" }]],
  "ℹ️ *HOW GAMEHUB PRO WORKS*\n━━━━━━━━━━━━━━\n\n" +
  "🎮 Play games to earn coins and XP.\n" +
  "🏆 Win matches to improve your stats.\n" +
  "🎁 Claim daily rewards and build your streak.\n" +
  "📈 Gain XP to increase your level.\n" +
  "👥 Some games support group and 1v1 play."
);
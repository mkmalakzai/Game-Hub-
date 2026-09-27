/*CMD
  command: admin_trivia
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
  "🧠 *TRIVIA CONTROL*\n━━━━━━━━━━━━━━\n\n" +
  "Question Bank: *24 Questions*\n" +
  "🟢 Easy: *8*\n" +
  "🟡 Medium: *8*\n" +
  "🔴 Hard: *8*\n\n" +
  "Rewards scale by difficulty and repeat protection avoids serving the same question twice in a row."
);
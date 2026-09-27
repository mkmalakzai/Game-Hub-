/*CMD
  command: admin_users
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

var users = Bot.getProperty("t5_users", []);
var text = "👥 *USERS*\n━━━━━━━━━━━━━━\n\nTotal users: *" + users.length + "*\n\n";

if (!users.length) {
  text += "No users recorded yet.";
} else {
  var start = Math.max(0, users.length - 10);
  for (var i=start; i<users.length; i++) {
    text += "• `" + users[i] + "`\n";
  }
}

Bot.sendInlineKeyboard([[{title:"⬅️ Admin Panel",command:"admin_panel"}]], text);
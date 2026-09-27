/*CMD
  command: admin_bot_username_save
  help:
  need_reply: true
  folder: ADMIN
  aliases:
CMD*/

var ownerId = String(Bot.getProperty("t5_owner") || "");
if (String(user.telegramid) !== ownerId) return;

var username = String(message || "").trim().replace("@","");
if (!/^[A-Za-z0-9_]{5,32}$/.test(username) || username.toLowerCase().slice(-3) !== "bot") {
  Bot.sendMessage("❌ Invalid bot username. Send the exact Telegram bot username without @.");
  return;
}

Bot.setProperty("t5_bot_username", username, "string");
Bot.sendInlineKeyboard(
  [[{title:"⬅️ Settings",command:"admin_settings"}]],
  "✅ *BOT USERNAME SAVED*\n━━━━━━━━━━━━━━\n\n@" + username + "\n\nInvite and challenge links will now use this username."
);
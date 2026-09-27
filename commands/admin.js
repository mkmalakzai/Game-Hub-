/*CMD
  command: /admin
  help: Open the admin panel
  need_reply: false
  folder: ADMIN
  aliases: admin
CMD*/

if (!user || !user.telegramid) { return; }

var ownerId = String(Bot.getProperty("t5_owner") || "");
var ready = Bot.getProperty("t5_setup_done") === "yes";

if (!ready || !ownerId) {
  Bot.sendInlineKeyboard(
    [[{ title: "⚙️ Run Setup", command: "/setup" }]],
    "⚠️ *SETUP REQUIRED*\n\nRun /setup first to configure GameHub Pro."
  );
  return;
}

if (String(user.telegramid) !== ownerId) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

Bot.runCommand("admin_panel");

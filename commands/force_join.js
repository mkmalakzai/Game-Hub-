/*CMD
  command: force_join
  help:
  need_reply: false
  folder: FORCE_JOIN
  aliases:
CMD*/

var fjEnabled = Bot.getProperty("fj_enabled", "yes");

if (fjEnabled != "yes") {
  Bot.runCommand("main_menu");
  return;
}

var channels = Bot.getProperty("fj_channels", []);

if (!channels || channels.length == 0) {
  Bot.runCommand("main_menu");
  return;
}

var keyboard = [];

for (var i = 0; i < channels.length; i++) {
  var ch = channels[i];
  if (!ch || !ch.username) continue;

  keyboard.push([
    {
      title: "📢 Join " + (ch.title || ch.username),
      url: "https://t.me/" + ch.username.replace("@", "")
    }
  ]);
}

keyboard.push([{ title: "✅ Check Joined", command: "check_join" }]);

Bot.sendInlineKeyboard(
  keyboard,
  "🔒 *JOIN REQUIRED*\n━━━━━━━━━━━━━━\n\nTo use GameHub Pro, please join all required channels below.\n\nAfter joining, tap *✅ Check Joined*."
);
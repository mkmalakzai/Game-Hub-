/*
  command: admin_fj_add_save
  help:
  need_reply: true
  folder: ADMIN
*/

var ownerId = Bot.getProperty("owner_id");

if (!ownerId || String(user.telegramid) != String(ownerId)) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var username = message.trim();

if (username.indexOf("@") !== 0) {
  Bot.sendMessage("❌ Invalid username. Send it like `@yourchannel`.");
  return;
}

var channels = Bot.getProperty("fj_channels", []);

for (var i = 0; i < channels.length; i++) {
  if (channels[i].username == username) {
    Bot.sendMessage("⚠️ This channel is already added.");
    return;
  }
}

channels.push({
  username: username,
  title: username.replace("@", "")
});

Bot.setProperty("fj_channels", channels, "json");
Bot.sendMessage("✅ Channel added successfully.");
Bot.runCommand("admin_fj");
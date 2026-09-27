/*CMD
  command: admin_economy_set
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

var mode = String(params || "balanced");
var coin = 1;
var xp = 1;

if (mode == "slow") {
  coin = 0.75;
  xp = 0.75;
}
if (mode == "fast") {
  coin = 1.25;
  xp = 1.15;
}

Bot.setProperty("t5_coin_multiplier", String(coin), "string");
Bot.setProperty("t5_xp_multiplier", String(xp), "string");

Bot.sendMessage("✅ Economy mode updated to *" + mode.toUpperCase() + "*.");
Bot.runCommand("admin_economy");
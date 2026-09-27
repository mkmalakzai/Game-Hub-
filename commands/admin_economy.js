/*CMD
  command: admin_economy
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

var coin = Number(Bot.getProperty("t5_coin_multiplier") || 1);
var xp = Number(Bot.getProperty("t5_xp_multiplier") || 1);

var mode = "Balanced";
if (coin < 1) mode = "Slow";
if (coin > 1) mode = "Fast";

Bot.sendInlineKeyboard(
  [
    [
      {title:"🐢 Slow",command:"admin_economy_set slow"},
      {title:"⚖️ Balanced",command:"admin_economy_set balanced"}
    ],
    [{title:"⚡ Fast",command:"admin_economy_set fast"}],
    [{title:"⬅️ Admin Panel",command:"admin_panel"}]
  ],
  "💰 *ECONOMY CONTROL*\n━━━━━━━━━━━━━━\n\n" +
  "Current Mode: *" + mode + "*\n" +
  "🪙 Coin Multiplier: *" + coin + "x*\n" +
  "⭐ XP Multiplier: *" + xp + "x*\n\n" +
  "Recommended for public bots: *Slow* or *Balanced*."
);
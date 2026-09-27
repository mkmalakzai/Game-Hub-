/*CMD
  command: coin_flip_pick
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var now = Date.now();
var last = Number(User.getProperty("t5_cd_coin") || 0);
if (now - last < 2500) {
  Bot.sendMessage("⏳ Wait a moment before flipping again.");
  return;
}
User.setProperty("t5_cd_coin", now, "integer");

var pick = String(params || "").toLowerCase();
if (pick != "heads" && pick != "tails") {
  Bot.runCommand("coin_flip");
  return;
}

var result = Math.random() < 0.5 ? "heads" : "tails";
var win = pick == result;

Bot.runCommand("game_reward " + JSON.stringify({
  result: win ? "win" : "loss",
  coins: win ? 4 : -2,
  xp: win ? 2 : -1
}));

Bot.sendInlineKeyboard(
  [
    [{title:"🪙 Flip Again",command:"coin_flip"}],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "🪙 *COIN FLIP*\n━━━━━━━━━━━━━━\n\n" +
  "Your call: *" + pick.toUpperCase() + "*\n" +
  "Result: *" + result.toUpperCase() + "*\n\n" +
  (win ? "✅ *Correct*\n+4 Coins • +2 XP" : "❌ *Missed*\n-2 Coins • -1 XP")
);
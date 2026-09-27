/*CMD
  command: coin_flip_pick
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var pick = String(params || "").toLowerCase();
var result = Math.random() < 0.5 ? "heads" : "tails";
var win = pick == result;

Bot.runCommand("game_reward " + JSON.stringify({win:win,coins:win?12:2,xp:win?8:2}));

Bot.sendInlineKeyboard(
  [[{title:"🪙 Play Again",command:"coin_flip"},{title:"⬅️ Games",command:"games"}]],
  "🪙 *COIN FLIP*\n━━━━━━━━━━━━━━\n\nResult: *" + result.toUpperCase() + "*\n\n" +
  (win ? "🏆 Correct! +12 Coins, +8 XP" : "❌ Wrong guess. +2 Coins, +2 XP")
);
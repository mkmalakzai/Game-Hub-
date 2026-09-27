/*CMD
  command: guess_pick
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var answer = Number(User.getProperty("t5_guess_answer") || 0);
var pick = Number(params || 0);

if (!answer) {
  Bot.runCommand("guess_game");
  return;
}

User.setProperty("t5_guess_answer", 0, "integer");
var win = pick == answer;
Bot.runCommand("game_reward " + JSON.stringify({win:win,coins:win?20:2,xp:win?12:2}));

Bot.sendInlineKeyboard(
  [[{title:"🔁 Play Again",command:"guess_game"},{title:"⬅️ Games",command:"games"}]],
  "🔢 *GUESS THE NUMBER*\n━━━━━━━━━━━━━━\n\nYour guess: *" + pick + "*\nCorrect number: *" + answer + "*\n\n" +
  (win ? "🎯 Perfect! +20 Coins, +12 XP" : "❌ Not this time. +2 Coins, +2 XP")
);
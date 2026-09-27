/*CMD
  command: trivia_pick
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var answer = String(User.getProperty("t5_trivia_answer") || "");
var pick = String(params || "").toLowerCase();
var win = answer && pick == answer;

User.setProperty("t5_trivia_answer", "", "string");
Bot.runCommand("game_reward " + JSON.stringify({win:win,coins:win?18:2,xp:win?10:2}));

Bot.sendInlineKeyboard(
  [[{title:"🧠 Next Question",command:"trivia"},{title:"⬅️ Games",command:"games"}]],
  "🧠 *TRIVIA RESULT*\n━━━━━━━━━━━━━━\n\n" +
  (win ? "✅ Correct! +18 Coins, +10 XP" : "❌ Wrong answer. Correct: *" + answer.toUpperCase() + "*\n+2 Coins, +2 XP")
);
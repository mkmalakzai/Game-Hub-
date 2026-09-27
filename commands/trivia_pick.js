/*CMD
  command: trivia_pick
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var answer = String(User.getProperty("t5_trivia_answer") || "");
var difficulty = String(User.getProperty("t5_trivia_difficulty") || "easy");
var pick = String(params || "").toLowerCase();

if (!answer) {
  Bot.runCommand("trivia");
  return;
}

var win = pick == answer;

var coins = 3;
var xp = 2;

if (difficulty == "medium") {
  coins = 5;
  xp = 3;
}
if (difficulty == "hard") {
  coins = 8;
  xp = 5;
}

User.setProperty("t5_trivia_answer", "", "string");

Bot.runCommand("game_reward " + JSON.stringify({
  result: win ? "win" : "loss",
  coins: win ? coins : 0,
  xp: win ? xp : 1
}));

Bot.sendInlineKeyboard(
  [
    [{title:"🧠 Next Question",command:"trivia_play " + difficulty}],
    [{title:"⬅️ Trivia Menu",command:"trivia"}]
  ],
  "🧠 *TRIVIA RESULT*\n━━━━━━━━━━━━━━\n\n" +
  (win
    ? "✅ *Correct answer*\n+" + coins + " Coins • +" + xp + " XP"
    : "❌ *Incorrect*\nCorrect answer: *" + answer.toUpperCase() + "*\nNo Coins • +1 XP")
);
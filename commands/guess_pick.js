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

Bot.runCommand("game_reward " + JSON.stringify({
  result: win ? "win" : "loss",
  coins: win ? 8 : -3,
  xp: win ? 4 : -1
}));

Bot.sendInlineKeyboard(
  [
    [{title:"🔢 New Number",command:"guess_game"}],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "🔢 *NUMBER HUNT*\n━━━━━━━━━━━━━━\n\n" +
  "Your guess: *" + pick + "*\n" +
  "Hidden number: *" + answer + "*\n\n" +
  (win
    ? "🎯 *Perfect hit*\n+8 Coins • +4 XP"
    : "❌ *Missed*\n-3 Coins • -1 XP")
);
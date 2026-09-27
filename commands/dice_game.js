/*CMD
  command: dice_game
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var now = Date.now();
var last = Number(User.getProperty("t5_cd_dice") || 0);
if (now - last < 2500) {
  Bot.sendMessage("⏳ Easy there — wait a moment before rolling again.");
  return;
}
User.setProperty("t5_cd_dice", now, "integer");

var player = Math.floor(Math.random() * 6) + 1;
var bot = Math.floor(Math.random() * 6) + 1;
var win = player > bot;
var draw = player == bot;

if (draw) {
  Bot.runCommand("game_reward " + JSON.stringify({result:"draw",coins:1,xp:1}));
} else {
  Bot.runCommand("game_reward " + JSON.stringify({
    result: win ? "win" : "loss",
    coins: win ? 5 : 0,
    xp: win ? 3 : 1
  }));
}

Bot.sendInlineKeyboard(
  [
    [{title:"🎲 Roll Again",command:"dice_game"}],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "🎲 *DICE DUEL*\n━━━━━━━━━━━━━━\n\n" +
  "You rolled: *" + player + "*\n" +
  "Opponent: *" + bot + "*\n\n" +
  (draw
    ? "🤝 *Draw*\n+1 Coin • +1 XP"
    : win
      ? "🏆 *Victory*\n+5 Coins • +3 XP"
      : "💥 *Defeat*\nNo Coins • +1 XP")
);
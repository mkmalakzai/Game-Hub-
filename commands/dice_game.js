/*CMD
  command: dice_game
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var player = Math.floor(Math.random() * 6) + 1;
var bot = Math.floor(Math.random() * 6) + 1;
var win = player > bot;
var draw = player == bot;

if (draw) {
  Libs.ResourcesLib.userRes("coins").add(5);
  Libs.ResourcesLib.userRes("xp").add(5);
  Bot.sendInlineKeyboard([[{title:"🎲 Play Again",command:"dice_game"},{title:"⬅️ Games",command:"games"}]],
    "🎲 *DICE BATTLE*\n━━━━━━━━━━━━━━\n\nYou: *" + player + "*\nBot: *" + bot + "*\n\n🤝 Draw! +5 Coins, +5 XP");
  return;
}

Bot.runCommand("game_reward " + JSON.stringify({win:win,coins:win?15:3,xp:win?10:3}));
Bot.sendInlineKeyboard([[{title:"🎲 Play Again",command:"dice_game"},{title:"⬅️ Games",command:"games"}]],
  "🎲 *DICE BATTLE*\n━━━━━━━━━━━━━━\n\nYou: *" + player + "*\nBot: *" + bot + "*\n\n" +
  (win ? "🏆 You win! +15 Coins, +10 XP" : "💥 You lose. +3 Coins, +3 XP"));
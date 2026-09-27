/*CMD
  command: challenge_play
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var you = Math.floor(Math.random()*100)+1;
var rival = Math.floor(Math.random()*100)+1;
var draw = you == rival;
var win = you > rival;

if (draw) {
  Libs.ResourcesLib.userRes("coins").add(6);
  Libs.ResourcesLib.userRes("xp").add(5);
} else {
  Bot.runCommand("game_reward " + JSON.stringify({win:win,coins:win?25:4,xp:win?15:4}));
}

Bot.sendInlineKeyboard(
  [[{title:"⚔️ Duel Again",command:"challenge_play"},{title:"⬅️ Games",command:"games"}]],
  "⚔️ *1v1 CHALLENGE*\n━━━━━━━━━━━━━━\n\nYou: *" + you + "*\nOpponent: *" + rival + "*\n\n" +
  (draw ? "🤝 Draw! +6 Coins, +5 XP" : (win ? "🏆 Victory! +25 Coins, +15 XP" : "💥 Defeat. +4 Coins, +4 XP"))
);
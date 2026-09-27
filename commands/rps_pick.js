/*CMD
  command: rps_pick
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var pick = String(params || "").toLowerCase();
var opts = ["rock","paper","scissors"];
var bot = opts[Math.floor(Math.random()*3)];
var draw = pick == bot;
var win =
  (pick=="rock" && bot=="scissors") ||
  (pick=="paper" && bot=="rock") ||
  (pick=="scissors" && bot=="paper");

if (draw) {
  Libs.ResourcesLib.userRes("coins").add(5);
  Libs.ResourcesLib.userRes("xp").add(5);
} else {
  Bot.runCommand("game_reward " + JSON.stringify({win:win,coins:win?15:3,xp:win?10:3}));
}

Bot.sendInlineKeyboard(
  [[{title:"🔁 Play Again",command:"rps_game"},{title:"⬅️ Games",command:"games"}]],
  "✊ *ROCK PAPER SCISSORS*\n━━━━━━━━━━━━━━\n\nYou: *" + pick.toUpperCase() + "*\nBot: *" + bot.toUpperCase() + "*\n\n" +
  (draw ? "🤝 Draw! +5 Coins, +5 XP" : (win ? "🏆 You win! +15 Coins, +10 XP" : "💥 You lose. +3 Coins, +3 XP"))
);
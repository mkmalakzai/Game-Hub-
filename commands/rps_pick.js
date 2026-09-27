/*CMD
  command: rps_pick
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var now = Date.now();
var last = Number(User.getProperty("t5_cd_rps") || 0);
if (now - last < 2500) {
  Bot.sendMessage("⏳ Wait a moment before the next round.");
  return;
}
User.setProperty("t5_cd_rps", now, "integer");

var pick = String(params || "").toLowerCase();
var opts = ["rock","paper","scissors"];
if (opts.indexOf(pick) === -1) {
  Bot.runCommand("rps_game");
  return;
}

var bot = opts[Math.floor(Math.random()*3)];
var draw = pick == bot;
var win =
  (pick=="rock" && bot=="scissors") ||
  (pick=="paper" && bot=="rock") ||
  (pick=="scissors" && bot=="paper");

if (draw) {
  Bot.runCommand("game_reward " + JSON.stringify({result:"draw",coins:1,xp:1}));
} else {
  Bot.runCommand("game_reward " + JSON.stringify({
    result: win ? "win" : "loss",
    coins: win ? 5 : -2,
    xp: win ? 3 : -1
  }));
}

Bot.sendInlineKeyboard(
  [
    [{title:"🔁 New Round",command:"rps_game"}],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "✊ *RPS ARENA*\n━━━━━━━━━━━━━━\n\n" +
  "You: *" + pick.toUpperCase() + "*\n" +
  "Opponent: *" + bot.toUpperCase() + "*\n\n" +
  (draw
    ? "🤝 *Draw*\n+1 Coin • +1 XP"
    : win
      ? "🏆 *Victory*\n+5 Coins • +3 XP"
      : "💥 *Defeat*\n-2 Coins • -1 XP")
);
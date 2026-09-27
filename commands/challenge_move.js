/*CMD
  command: challenge_move
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var move = String(params || "").toLowerCase();
var moves = ["attack","guard","power"];

if (moves.indexOf(move) === -1) {
  Bot.runCommand("challenge");
  return;
}

var pHp = Number(User.getProperty("t5_duel_player_hp") || 0);
var aHp = Number(User.getProperty("t5_duel_ai_hp") || 0);
var round = Number(User.getProperty("t5_duel_round") || 1);

if (pHp <= 0 || aHp <= 0) {
  Bot.runCommand("challenge");
  return;
}

var ai = moves[Math.floor(Math.random() * moves.length)];
var outcome = "draw";

if (
  (move=="attack" && ai=="power") ||
  (move=="guard" && ai=="attack") ||
  (move=="power" && ai=="guard")
) {
  outcome = "win";
  aHp -= 1;
} else if (move != ai) {
  outcome = "loss";
  pHp -= 1;
}

round += 1;

User.setProperty("t5_duel_player_hp", pHp, "integer");
User.setProperty("t5_duel_ai_hp", aHp, "integer");
User.setProperty("t5_duel_round", round, "integer");

var icons = {attack:"🗡",guard:"🛡",power:"⚡"};
var roundText =
  "You: " + icons[move] + " *" + move.toUpperCase() + "*\n" +
  "Opponent: " + icons[ai] + " *" + ai.toUpperCase() + "*\n\n";

if (outcome=="win") roundText += "✅ You won the round.";
if (outcome=="loss") roundText += "💥 Opponent won the round.";
if (outcome=="draw") roundText += "🤝 Round draw.";

if (pHp <= 0 || aHp <= 0) {
  var win = aHp <= 0 && pHp > 0;

  Bot.runCommand("game_reward " + JSON.stringify({
    result: win ? "win" : "loss",
    coins: win ? 7 : 0,
    xp: win ? 4 : 1
  }));

  User.setProperty("t5_duel_player_hp", 0, "integer");
  User.setProperty("t5_duel_ai_hp", 0, "integer");

  Bot.sendInlineKeyboard(
    [
      [{title:"⚔️ Rematch",command:"challenge_play"}],
      [{title:"⬅️ Games",command:"games"}]
    ],
    "⚔️ *ARENA DUEL • FINAL*\n━━━━━━━━━━━━━━\n\n" +
    roundText + "\n\n" +
    "❤️ You: *" + pHp + " HP*\n" +
    "🤖 Opponent: *" + aHp + " HP*\n\n" +
    (win
      ? "🏆 *ARENA VICTORY*\n+7 Coins • +4 XP"
      : "💥 *ARENA DEFEAT*\nNo Coins • +1 XP")
  );
  return;
}

Bot.sendInlineKeyboard(
  [
    [
      {title:"🗡 Attack",command:"challenge_move attack"},
      {title:"🛡 Guard",command:"challenge_move guard"}
    ],
    [{title:"⚡ Power",command:"challenge_move power"}],
    [{title:"🏳 Leave Arena",command:"games"}]
  ],
  "⚔️ *ARENA DUEL • ROUND " + round + "*\n━━━━━━━━━━━━━━\n\n" +
  roundText + "\n\n" +
  "❤️ You: *" + pHp + " HP*\n" +
  "🤖 Opponent: *" + aHp + " HP*\n\n" +
  "Choose your next move:"
);
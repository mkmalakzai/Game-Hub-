/*CMD
  command: games
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

if (Bot.getProperty("t5_games_enabled", "yes") != "yes") {
  Bot.sendInlineKeyboard(
    [[{title:"⬅️ Main Menu",command:"main_menu"}]],
    "🚧 *GAME CENTER OFFLINE*\n━━━━━━━━━━━━━━\n\nGames are temporarily disabled by the administrator."
  );
  return;
}

Bot.sendInlineKeyboard(
  [
    [
      { title: "🎲 Dice Duel", command: "dice_game" },
      { title: "🔢 Number Hunt", command: "guess_game" }
    ],
    [
      { title: "✊ RPS Arena", command: "rps_game" },
      { title: "🪙 Coin Flip", command: "coin_flip" }
    ],
    [
      { title: "🧠 Trivia Arena", command: "trivia" },
      { title: "⚔️ Arena Duel", command: "challenge" }
    ],
    [
      { title: "⬅️ Main Menu", command: "main_menu" }
    ]
  ],
  "🎮 *GAME CENTER*\n" +
  "━━━━━━━━━━━━━━\n\n" +
  "Choose a mode and build your record.\n\n" +
  "⚡ Quick Games — fast rounds, smaller rewards\n" +
  "🧠 Trivia — difficulty-based rewards\n" +
  "⚔️ Arena Duel — tactical multi-round battle\n\n" +
  "Wins improve your streak, XP and leaderboard position."
);
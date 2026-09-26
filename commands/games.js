/*
  command: games
  help:
  need_reply: false
  folder: GAMES
*/

Bot.sendInlineKeyboard(
  [
    [
      { title: "🎲 Dice Battle", command: "dice_game" },
      { title: "🔢 Guess Number", command: "guess_game" }
    ],
    [
      { title: "✊ Rock Paper Scissors", command: "rps_game" },
      { title: "🪙 Coin Flip", command: "coin_flip" }
    ],
    [
      { title: "🧠 Trivia Quiz", command: "trivia" },
      { title: "⚔️ 1v1 Challenge", command: "challenge" }
    ],
    [
      { title: "⬅️ Main Menu", command: "main_menu" }
    ]
  ],
  "🎮 *GAME CENTER*\n━━━━━━━━━━━━━━\n\nChoose a game:"
);
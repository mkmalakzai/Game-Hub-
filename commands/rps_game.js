/*CMD
  command: rps_game
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

Bot.sendInlineKeyboard(
  [
    [
      {title:"✊ Rock",command:"rps_pick rock"},
      {title:"✋ Paper",command:"rps_pick paper"},
      {title:"✌️ Scissors",command:"rps_pick scissors"}
    ],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "✊ *ROCK PAPER SCISSORS*\n━━━━━━━━━━━━━━\n\nChoose your move:"
);
/*CMD
  command: coin_flip
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

Bot.sendInlineKeyboard(
  [[{title:"🪙 Heads",command:"coin_flip_pick heads"},{title:"🦅 Tails",command:"coin_flip_pick tails"}],[{title:"⬅️ Games",command:"games"}]],
  "🪙 *COIN FLIP*\n━━━━━━━━━━━━━━\n\nPick a side:"
);
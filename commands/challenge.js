/*CMD
  command: challenge
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

Bot.sendInlineKeyboard(
  [[{title:"🎲 Quick Duel",command:"challenge_play"}],[{title:"⬅️ Games",command:"games"}]],
  "⚔️ *1v1 CHALLENGE*\n━━━━━━━━━━━━━━\n\nThis starter duel puts you against a random opponent score.\nHighest roll wins."
);
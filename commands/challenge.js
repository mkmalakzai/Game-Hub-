/*CMD
  command: challenge
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

Bot.sendInlineKeyboard(
  [
    [{title:"⚔️ Enter Arena",command:"challenge_play"}],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "⚔️ *ARENA DUEL*\n━━━━━━━━━━━━━━\n\nA tactical multi-round duel against the Arena AI.\n\n❤️ You start with 3 HP\n🤖 Opponent starts with 3 HP\n🎯 Choose the right move each round\n\n🗡 Attack beats Power\n🛡 Guard beats Attack\n⚡ Power beats Guard\n\nFirst to reduce the opponent to 0 HP wins."
);
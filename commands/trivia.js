/*CMD
  command: trivia
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

Bot.sendInlineKeyboard(
  [
    [
      {title:"🟢 Easy",command:"trivia_play easy"},
      {title:"🟡 Medium",command:"trivia_play medium"}
    ],
    [{title:"🔴 Hard",command:"trivia_play hard"}],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "🧠 *TRIVIA ARENA*\n━━━━━━━━━━━━━━\n\nChoose a difficulty. Harder questions give slightly better rewards.\n\n🟢 Easy  •  +3 Coins / +2 XP\n🟡 Medium • +5 Coins / +3 XP\n🔴 Hard   •  +8 Coins / +5 XP"
);
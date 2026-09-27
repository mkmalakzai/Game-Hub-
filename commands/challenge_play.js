/*CMD
  command: challenge_play
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

User.setProperty("t5_duel_player_hp", 3, "integer");
User.setProperty("t5_duel_ai_hp", 3, "integer");
User.setProperty("t5_duel_round", 1, "integer");

Bot.sendInlineKeyboard(
  [
    [
      {title:"🗡 Attack",command:"challenge_move attack"},
      {title:"🛡 Guard",command:"challenge_move guard"}
    ],
    [{title:"⚡ Power",command:"challenge_move power"}],
    [{title:"🏳 Leave Arena",command:"games"}]
  ],
  "⚔️ *ARENA DUEL • ROUND 1*\n━━━━━━━━━━━━━━\n\n❤️ You: *3 HP*\n🤖 Opponent: *3 HP*\n\nChoose your move:"
);
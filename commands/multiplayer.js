/*CMD
  command: multiplayer
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

if (Bot.getProperty("t5_multiplayer_enabled","yes") != "yes") {
  Bot.sendInlineKeyboard(
    [[{title:"⬅️ Games",command:"games"}]],
    "🚧 *MULTIPLAYER OFFLINE*\n━━━━━━━━━━━━━━\n\nMultiplayer is temporarily disabled."
  );
  return;
}

Bot.sendInlineKeyboard(
  [
    [
      {title:"⚔️ Challenge Player",command:"mp_create"},
      {title:"🎲 Quick Match",command:"mp_quick"}
    ],
    [
      {title:"👥 Group Battle",command:"group_game"},
      {title:"📜 My Matches",command:"mp_history"}
    ],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "🌐 *MULTIPLAYER HUB*\n━━━━━━━━━━━━━━\n\nChallenge real players, enter matchmaking, or start a group battle."
);
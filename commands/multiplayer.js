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
      {title:"📥 Pending Challenge",command:"mp_inbox"}
    ],
    [
      {title:"🔑 Enter Match ID",command:"mp_enter"},
      {title:"🎲 Quick Match",command:"mp_quick"}
    ],
    [
      {title:"👥 Group Battle",command:"group_game"},
      {title:"📜 Match History",command:"mp_history"}
    ],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "🌐 *MULTIPLAYER HUB*\n━━━━━━━━━━━━━━\n\nReal player challenges, matchmaking, and group battles."
);
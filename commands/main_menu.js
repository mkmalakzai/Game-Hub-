/*
  command: main_menu
  help:
  need_reply: false
  folder: CORE
*/

var banned = Bot.getProperty("user_banned_" + user.telegramid) == "yes";

if (banned) {
  Bot.sendMessage("🚫 ACCOUNT RESTRICTED\n\nYour access to this bot has been restricted by an administrator.");
  return;
}

var firstName = user.first_name ? user.first_name : "Player";

Bot.sendInlineKeyboard(
  [
    [
      { title: "🎮 Play Games", command: "games" },
      { title: "👤 My Profile", command: "profile" }
    ],
    [
      { title: "🏆 Leaderboard", command: "leaderboard" },
      { title: "🎁 Daily Reward", command: "daily_reward" }
    ],
    [
      { title: "ℹ️ Help", command: "help" }
    ]
  ],
  "🎮 *GAMEHUB PRO*\n━━━━━━━━━━━━━━\n\nWelcome, *" + firstName + "*!\n\nPlay games, earn coins, gain XP and climb the leaderboard.\n\nChoose an option below:"
);
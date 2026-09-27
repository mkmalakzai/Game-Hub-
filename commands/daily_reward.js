/*CMD
  command: daily_reward
  help:
  need_reply: false
  folder: REWARDS
  aliases:
CMD*/

var now = Date.now();
var last = Number(User.getProperty("t5_daily_last") || 0);
var streak = Number(User.getProperty("t5_daily_streak") || 0);
var day = 24 * 60 * 60 * 1000;

if (last && now - last < day) {
  var left = day - (now - last);
  var h = Math.floor(left / 3600000);
  var m = Math.floor((left % 3600000) / 60000);
  Bot.sendInlineKeyboard(
    [[{title:"⬅️ Main Menu",command:"main_menu"}]],
    "⏳ *DAILY REWARD*\n━━━━━━━━━━━━━━\n\nAlready claimed.\nCome back in *" + h + "h " + m + "m*."
  );
  return;
}

if (last && now - last <= day * 2) {
  streak += 1;
} else {
  streak = 1;
}

var reward = 25 + Math.min(streak - 1, 5) * 5;
Libs.ResourcesLib.userRes("coins").add(reward);
Libs.ResourcesLib.userRes("xp").add(10);

User.setProperty("t5_daily_last", now, "integer");
User.setProperty("t5_daily_streak", streak, "integer");

Bot.sendInlineKeyboard(
  [[{title:"⬅️ Main Menu",command:"main_menu"}]],
  "🎁 *DAILY REWARD CLAIMED*\n━━━━━━━━━━━━━━\n\n🪙 +" + reward + " Coins\n⭐ +10 XP\n🔥 Streak: *" + streak + "* day(s)"
);
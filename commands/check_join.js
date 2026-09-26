/*
  command: check_join
  help:
  need_reply: false
  folder: FORCE_JOIN
*/

var channels = Bot.getProperty("fj_channels", []);

if (!channels || channels.length == 0) {
  User.setProperty("fj_completed", true, "boolean");
  Bot.runCommand("main_menu");
  return;
}

var index = User.getProperty("fj_check_index", 0);

if (index >= channels.length) {
  User.setProperty("fj_completed", true, "boolean");
  User.setProperty("fj_check_index", 0, "integer");
  Bot.sendMessage("✅ *JOIN VERIFIED*\n\nAccess granted. Welcome to GameHub Pro!");
  Bot.runCommand("main_menu");
  return;
}

var ch = channels[index];

if (!ch || !ch.username) {
  User.setProperty("fj_check_index", index + 1, "integer");
  Bot.runCommand("check_join");
  return;
}

Api.getChatMember({
  chat_id: ch.username,
  user_id: user.telegramid,
  on_result: "check_join_result"
});
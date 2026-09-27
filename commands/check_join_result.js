/*CMD
  command: check_join_result
  help:
  need_reply: false
  folder: FORCE_JOIN
  aliases:
CMD*/

var res = options && options.result ? options.result : null;

if (!res || !res.status) {
  User.setProperty("fj_check_index", 0, "integer");
  Bot.sendMessage("⚠️ I could not verify your membership. Make sure the bot is admin in the required channels.");
  return;
}

var ok =
  res.status == "member" ||
  res.status == "administrator" ||
  res.status == "creator";

if (!ok) {
  User.setProperty("fj_check_index", 0, "integer");
  Bot.sendMessage("❌ You have not joined all required channels yet.");
  Bot.runCommand("force_join");
  return;
}

var index = User.getProperty("fj_check_index", 0);
User.setProperty("fj_check_index", index + 1, "integer");
Bot.runCommand("check_join");
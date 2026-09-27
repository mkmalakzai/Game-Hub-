/*CMD
  command: mp_move
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var raw = String(params || "").split(" ");
var matchId = raw.shift();
var move = raw.shift();

var match = Bot.getProperty("t5_mp_" + matchId);

if (!match || match.status !== "active") {
  Bot.sendMessage("❌ This match is no longer active.");
  return;
}

var uid = String(user.telegramid);

if (uid !== String(match.p1) && uid !== String(match.p2)) {
  Bot.sendMessage("⛔ This match isn't yours.");
  return;
}

var allowed = ["attack","guard","power"];
if (allowed.indexOf(move) === -1) {
  Bot.sendMessage("❌ Invalid move.");
  return;
}

if (uid === String(match.p1)) {
  if (match.p1_move) {
    Bot.sendMessage("⚠️ Your move is already locked.");
    return;
  }
  match.p1_move = move;
} else {
  if (match.p2_move) {
    Bot.sendMessage("⚠️ Your move is already locked.");
    return;
  }
  match.p2_move = move;
}

Bot.setProperty("t5_mp_" + matchId, match, "json");

if (!match.p1_move || !match.p2_move) {
  Bot.sendMessage("✅ Move locked. Waiting for your opponent...");
  return;
}

Bot.runCommand("mp_resolve " + matchId);
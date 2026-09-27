/*CMD
  command: group_start
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var roomId = String(params || "");
var room = Bot.getProperty("t5_group_room_" + roomId);

if (!room || room.status !== "open") {
  Bot.sendMessage("❌ This group battle is unavailable.");
  return;
}

if (String(user.telegramid) !== String(room.host)) {
  Bot.sendMessage("⛔ Only the host can start the battle.");
  return;
}

if (room.players.length < 2) {
  Bot.sendMessage("⚠️ At least 2 players are required.");
  return;
}

room.status = "finished";
var winner = room.players[Math.floor(Math.random()*room.players.length)];
room.winner = winner.id;

Bot.setProperty("t5_group_room_" + roomId, room, "json");

Bot.sendMessage(
  "👥 *GROUP BATTLE RESULT*\n━━━━━━━━━━━━━━\n\nPlayers: *" + room.players.length + "*\n🏆 Winner: *" + winner.name + "*\n\nWinner earns +8 Coins and +5 XP."
);

if (String(user.telegramid) === String(winner.id)) {
  Bot.runCommand("score_change " + JSON.stringify({coins:8,xp:5,reason:"Group Battle Win"}));
}
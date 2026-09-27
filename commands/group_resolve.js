/*CMD
  command: group_resolve
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var roomId = String(params || "");
var room = Bot.getProperty("t5_group_room_" + roomId);

if (!room || room.status !== "rolling") return;

var max = -1;
var winners = [];

for (var i=0; i<room.players.length; i++) {
  var r = Number(room.players[i].roll || 0);
  if (r > max) {
    max = r;
    winners = [room.players[i]];
  } else if (r === max) {
    winners.push(room.players[i]);
  }
}

if (winners.length > 1) {
  for (var t=0; t<room.players.length; t++) room.players[t].roll = 0;
  Bot.setProperty("t5_group_room_" + roomId, room, "json");

  Bot.sendInlineKeyboard(
    [[{title:"🎲 Tie Break Roll",command:"group_roll " + roomId}]],
    "🤝 *TIE BREAK*\n━━━━━━━━━━━━━━\n\nTop score: *" + max + "*\nAll players roll again."
  );
  return;
}

var winner = winners[0];
room.status = "finished";
room.winner = winner.id;
room.finished = Date.now();

Bot.setProperty("t5_group_room_" + roomId, room, "json");
Bot.setProperty("t5_group_active_" + room.chat_id, "", "string");

var lines = "";

for (var p=0; p<room.players.length; p++) {
  var pl = room.players[p];
  var isWinner = String(pl.id) === String(winner.id);

  Bot.runCommand("balance_apply " + JSON.stringify({
    uid:String(pl.id),
    coins:isWinner ? 8 : -2,
    xp:isWinner ? 5 : -1,
    wins:isWinner ? 1 : 0,
    losses:isWinner ? 0 : 1,
    result:isWinner ? "win" : "loss",
    reason:"Group Battle",
    opponent:"Group"
  }));

  lines += (isWinner ? "🏆 " : "• ") + pl.name + " — *" + pl.roll + "*\n";
}

Bot.sendInlineKeyboard(
  [[{title:"👥 New Group Battle",command:"group_game"}]],
  "👥 *GROUP BATTLE RESULT*\n━━━━━━━━━━━━━━\n\n" +
  lines + "\n" +
  "🏆 Winner: *" + winner.name + "*\n" +
  "Reward: *+8 Coins • +5 XP*\n" +
  "Others: *-2 Coins • -1 XP*"
);
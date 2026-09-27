/*CMD
  command: group_resolve
  help:
  need_reply: false
  folder: GROUP
  aliases:
CMD*/

var roomId = String(params || "");
var room = Bot.getProperty("t5_group_room_" + roomId);

if (!room || room.status !== "rolling") {
  return;
}

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
  for (var t=0; t<room.players.length; t++) {
    room.players[t].roll = 0;
  }
  Bot.setProperty("t5_group_room_" + roomId, room, "json");

  Bot.sendInlineKeyboard(
    [[{title:"🎲 Tie Break Roll",command:"group_roll " + roomId}]],
    "🤝 *TIE BREAK*\n━━━━━━━━━━━━━━\n\nTop score: *" + max + "*\nA tie occurred. Roll again."
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
  var coins = isWinner ? 8 : -2;
  var xp = isWinner ? 5 : -1;

  var coinKey = "t5_ext_coins_" + pl.id;
  var xpKey = "t5_ext_xp_" + pl.id;
  var histKey = "t5_mp_history_" + pl.id;

  var c = Number(Bot.getProperty(coinKey) || 0) + coins;
  var x = Number(Bot.getProperty(xpKey) || 0) + xp;
  if (c < 0) c = 0;
  if (x < 0) x = 0;

  Bot.setProperty(coinKey, c, "integer");
  Bot.setProperty(xpKey, x, "integer");

  var hist = Bot.getProperty(histKey, []);
  hist.unshift({
    match: roomId,
    result: isWinner ? "win" : "loss",
    opponent: "Group Battle",
    coins: coins,
    xp: xp,
    move: "roll " + pl.roll,
    opponent_move: "",
    time: Date.now()
  });
  if (hist.length > 20) hist = hist.slice(0,20);
  Bot.setProperty(histKey, hist, "json");

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
/*CMD
  command: mp_quick
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var queue = Bot.getProperty("t5_mp_queue", []);

for (var i=queue.length-1;i>=0;i--) {
  if (String(queue[i].id) === uid) {
    queue.splice(i,1);
  }
}

if (queue.length > 0) {
  var rival = queue.shift();
  var matchId = rival.id + "_" + uid + "_" + Date.now();

  Bot.setProperty("t5_mp_queue", queue, "json");
  Bot.setProperty("t5_mp_" + matchId, {
    id: matchId,
    p1: String(rival.id),
    p2: uid,
    p1_name: rival.name,
    p2_name: user.first_name || user.username || uid,
    p1_move: "",
    p2_move: "",
    status: "active",
    created: Date.now()
  }, "json");

  Bot.setProperty("t5_last_match_" + uid, matchId, "string");

  Bot.sendInlineKeyboard(
    [
      [
        {title:"🗡 Attack",command:"mp_move " + matchId + " attack"},
        {title:"🛡 Guard",command:"mp_move " + matchId + " guard"}
      ],
      [{title:"⚡ Power",command:"mp_move " + matchId + " power"}],
      [{title:"⬅️ Multiplayer",command:"multiplayer"}]
    ],
    "⚔️ *MATCH FOUND*\n━━━━━━━━━━━━━━\n\nOpponent: *" + rival.name + "*\n\nChoose your move."
  );
  return;
}

queue.push({
  id: uid,
  name: user.first_name || user.username || uid,
  joined: Date.now()
});

Bot.setProperty("t5_mp_queue", queue, "json");

Bot.sendInlineKeyboard(
  [
    [{title:"❌ Leave Queue",command:"mp_queue_leave"}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "🔎 *SEARCHING FOR OPPONENT*\n━━━━━━━━━━━━━━\n\nYou're now in the matchmaking queue."
);
/*CMD
  command: mp_quick
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var name = user.first_name || user.username || uid;
var queue = Bot.getProperty("t5_mp_queue", []);

// Remove stale/self queue entries.
var clean = [];
for (var i=0; i<queue.length; i++) {
  var age = Date.now() - Number(queue[i].joined || 0);
  if (String(queue[i].id) !== uid && age < 600000) clean.push(queue[i]);
}
queue = clean;

if (queue.length > 0) {
  var rival = queue.shift();
  var matchId = "Q" + Date.now() + "_" + String(rival.id).substr(-4) + uid.substr(-4);

  Bot.setProperty("t5_mp_queue", queue, "json");
  Bot.setProperty("t5_mp_" + matchId, {
    id:matchId,
    p1:String(rival.id),
    p2:uid,
    p1_name:rival.name,
    p2_name:name,
    p1_move:"",
    p2_move:"",
    status:"active",
    created:Date.now()
  }, "json");

  Bot.setProperty("t5_last_match_" + uid, matchId, "string");
  Bot.setProperty("t5_last_match_" + String(rival.id), matchId, "string");

  Api.sendMessage({
    chat_id:rival.id,
    text:"⚔️ *QUICK MATCH FOUND*\n━━━━━━━━━━━━━━\n\nOpponent: *" + name + "*\n\nReturn to Multiplayer and open *Current Match* to play.",
    parse_mode:"Markdown"
  });

  Bot.sendInlineKeyboard(
    [
      [{title:"🗡 Attack",command:"mp_move " + matchId + " attack"},{title:"🛡 Guard",command:"mp_move " + matchId + " guard"}],
      [{title:"⚡ Power",command:"mp_move " + matchId + " power"}],
      [{title:"⬅️ Multiplayer",command:"multiplayer"}]
    ],
    "⚔️ *QUICK MATCH FOUND*\n━━━━━━━━━━━━━━\n\nOpponent: *" + rival.name + "*\n\nChoose your move."
  );
  return;
}

queue.push({id:uid,name:name,joined:Date.now()});
Bot.setProperty("t5_mp_queue", queue, "json");

Bot.sendInlineKeyboard(
  [
    [{title:"🔄 Check Again",command:"mp_quick"}],
    [{title:"❌ Leave Queue",command:"mp_queue_leave"}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "🔎 *SEARCHING FOR OPPONENT*\n━━━━━━━━━━━━━━\n\n" +
  "You're in the matchmaking queue.\n" +
  "When another player searches, both players will be matched automatically.\n\n" +
  "You can also tap *Check Again*."
);
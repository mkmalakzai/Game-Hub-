/*CMD
  command: mp_queue_leave
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var queue = Bot.getProperty("t5_mp_queue", []);
var next = [];

for (var i=0;i<queue.length;i++) {
  if (String(queue[i].id) !== uid) {
    next.push(queue[i]);
  }
}

Bot.setProperty("t5_mp_queue", next, "json");
Bot.sendMessage("✅ You left the matchmaking queue.");
Bot.runCommand("multiplayer");
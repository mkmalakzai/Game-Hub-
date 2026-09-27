/*CMD
  command: mp_invite
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

var uid = String(user.telegramid);
var matchId = "I" + Date.now() + "_" + uid.substr(-5);
var botUsername = String(bot.name || "").replace("@","");

Bot.setProperty("t5_mp_" + matchId, {
  id:matchId,
  p1:uid,
  p2:"",
  p1_name:user.first_name || user.username || uid,
  p2_name:"",
  p1_move:"",
  p2_move:"",
  status:"invite",
  created:Date.now()
}, "json");

Bot.setProperty("t5_last_match_" + uid, matchId, "string");

var link = botUsername ? "https://t.me/" + botUsername + "?start=join_" + matchId : "";

Bot.sendInlineKeyboard(
  [
    link ? [{title:"📤 Share Challenge",url:"https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent("⚔️ Join my GameHub challenge!")}] : [],
    [{title:"📋 Match Details",command:"mp_show " + matchId}],
    [{title:"⬅️ Multiplayer",command:"multiplayer"}]
  ],
  "🔗 *INVITE CHALLENGE READY*\n━━━━━━━━━━━━━━\n\n" +
  "Share the button with your friend.\n" +
  "The first other player who opens it can accept the challenge.\n\n" +
  "No Telegram ID is required."
);
/*CMD
  command: multiplayer
  help:
  need_reply: false
  folder: MULTIPLAYER
  aliases:
CMD*/

if (Bot.getProperty("t5_multiplayer_enabled","yes") != "yes") {
  Bot.sendInlineKeyboard([[{title:"⬅️ Games",command:"games"}]],"🚧 Multiplayer is temporarily disabled.");
  return;
}

var lang = String(User.getProperty("t5_lang") || "en");
var desc = {
  en:"Real player challenges, matchmaking, and group battles.",
  es:"Desafíos reales, emparejamiento y batallas de grupo.",
  de:"Echte Spielerduelle, Matchmaking und Gruppenbattle.",
  fr:"Défis entre joueurs, matchmaking et combats de groupe.",
  tr:"Gerçek oyuncu mücadeleleri, eşleştirme ve grup savaşları.",
  id:"Tantangan pemain nyata, matchmaking, dan battle grup.",
  hi:"असली खिलाड़ी चुनौतियाँ, मैचमेकिंग और ग्रुप बैटल।",
  bn:"বাস্তব খেলোয়াড় চ্যালেঞ্জ, ম্যাচমেকিং এবং গ্রুপ ব্যাটল।"
}[lang] || "Real player challenges, matchmaking, and group battles.";

Bot.sendInlineKeyboard(
  [
    [{title:"⚔️ Challenge Player",command:"mp_create"},{title:"📥 Pending Challenge",command:"mp_inbox"}],
    [{title:"🔑 Enter Match ID",command:"mp_enter"},{title:"🎲 Quick Match",command:"mp_quick"}],
    [{title:"👥 Group Battle",command:"group_game"},{title:"📜 Match History",command:"mp_history"}],
    [{title:"⬅️ Games",command:"games"}]
  ],
  "🌐 *MULTIPLAYER HUB*\n━━━━━━━━━━━━━━\n\n" + desc
);
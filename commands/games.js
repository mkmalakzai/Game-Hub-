/*CMD
  command: games
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

if (Bot.getProperty("t5_games_enabled","yes") != "yes") {
  Bot.sendInlineKeyboard([[{title:"⬅️ Main Menu",command:"main_menu"}]],"🚧 Game Center is temporarily offline.");
  return;
}

var lang = String(User.getProperty("t5_lang") || "en");
var title = {
  en:"Choose a mode and build your record.",
  es:"Elige un modo y mejora tu historial.",
  de:"Wähle einen Modus und verbessere deine Bilanz.",
  fr:"Choisis un mode et améliore ton palmarès.",
  tr:"Bir mod seç ve istatistiklerini geliştir.",
  id:"Pilih mode dan bangun rekor kamu.",
  hi:"एक मोड चुनें और अपना रिकॉर्ड बेहतर करें।",
  bn:"একটি মোড বেছে নিন এবং আপনার রেকর্ড উন্নত করুন।"
}[lang] || "Choose a mode and build your record.";

Bot.sendInlineKeyboard(
  [
    [{title:"🎲 Dice Duel",command:"dice_game"},{title:"🔢 Number Hunt",command:"guess_game"}],
    [{title:"✊ RPS Arena",command:"rps_game"},{title:"🪙 Coin Flip",command:"coin_flip"}],
    [{title:"🧠 Trivia Arena",command:"trivia"},{title:"⚔️ Arena Duel",command:"challenge"}],
    [{title:"🌐 Multiplayer",command:"multiplayer"}],
    [{title:"⬅️ Main Menu",command:"main_menu"}]
  ],
  "🎮 *GAME CENTER*\n━━━━━━━━━━━━━━\n\n" + title
);
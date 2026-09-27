/*CMD
  command: main_menu
  help:
  need_reply: false
  folder: CORE
  aliases:
CMD*/

var banned = Bot.getProperty("user_banned_" + user.telegramid) == "yes";
if (banned) {
  Bot.sendMessage("🚫 ACCOUNT RESTRICTED");
  return;
}

var lang = String(User.getProperty("t5_lang") || "en");
var name = user.first_name || "Player";

var T = {
  en:{play:"🎮 Play Games",profile:"👤 My Profile",board:"🏆 Leaderboard",daily:"🎁 Daily Reward",lang:"🌐 Language",help:"ℹ️ Help",welcome:"Welcome",desc:"Play games, compete with real players, earn coins, gain XP and climb the leaderboard.",choose:"Choose an option below:"},
  es:{play:"🎮 Jugar",profile:"👤 Mi Perfil",board:"🏆 Clasificación",daily:"🎁 Recompensa Diaria",lang:"🌐 Idioma",help:"ℹ️ Ayuda",welcome:"Bienvenido",desc:"Juega, compite con jugadores reales, gana monedas y XP y sube en la clasificación.",choose:"Elige una opción:"},
  de:{play:"🎮 Spiele",profile:"👤 Mein Profil",board:"🏆 Rangliste",daily:"🎁 Tagesbonus",lang:"🌐 Sprache",help:"ℹ️ Hilfe",welcome:"Willkommen",desc:"Spiele, tritt gegen echte Spieler an, sammle Münzen und XP und steige in der Rangliste.",choose:"Wähle eine Option:"},
  fr:{play:"🎮 Jouer",profile:"👤 Mon Profil",board:"🏆 Classement",daily:"🎁 Récompense",lang:"🌐 Langue",help:"ℹ️ Aide",welcome:"Bienvenue",desc:"Joue, affronte de vrais joueurs, gagne des pièces et de l'XP et grimpe au classement.",choose:"Choisis une option :"},
  tr:{play:"🎮 Oyunlar",profile:"👤 Profilim",board:"🏆 Liderlik",daily:"🎁 Günlük Ödül",lang:"🌐 Dil",help:"ℹ️ Yardım",welcome:"Hoş geldin",desc:"Oyna, gerçek oyuncularla yarış, coin ve XP kazan, sıralamada yüksel.",choose:"Bir seçenek seç:"},
  id:{play:"🎮 Main Game",profile:"👤 Profil Saya",board:"🏆 Peringkat",daily:"🎁 Hadiah Harian",lang:"🌐 Bahasa",help:"ℹ️ Bantuan",welcome:"Selamat datang",desc:"Main, lawan pemain sungguhan, dapatkan coin dan XP, lalu naik peringkat.",choose:"Pilih opsi:"},
  hi:{play:"🎮 गेम खेलें",profile:"👤 मेरी प्रोफ़ाइल",board:"🏆 लीडरबोर्ड",daily:"🎁 दैनिक इनाम",lang:"🌐 भाषा",help:"ℹ️ मदद",welcome:"स्वागत है",desc:"गेम खेलें, असली खिलाड़ियों से मुकाबला करें, कॉइन और XP कमाएँ और रैंक बढ़ाएँ।",choose:"नीचे एक विकल्प चुनें:"},
  bn:{play:"🎮 গেম খেলুন",profile:"👤 আমার প্রোফাইল",board:"🏆 লিডারবোর্ড",daily:"🎁 দৈনিক পুরস্কার",lang:"🌐 ভাষা",help:"ℹ️ সহায়তা",welcome:"স্বাগতম",desc:"গেম খেলুন, বাস্তব খেলোয়াড়দের সাথে প্রতিযোগিতা করুন, কয়েন ও XP অর্জন করুন এবং র‍্যাঙ্ক বাড়ান।",choose:"নিচে একটি অপশন বেছে নিন:"}
};

var t = T[lang] || T.en;

Bot.sendInlineKeyboard(
  [
    [{title:t.play,command:"games"},{title:t.profile,command:"profile"}],
    [{title:t.board,command:"leaderboard"},{title:t.daily,command:"daily_reward"}],
    [{title:t.lang,command:"language"},{title:t.help,command:"help"}]
  ],
  "🎮 *GAMEHUB PRO*\n━━━━━━━━━━━━━━\n\n" +
  t.welcome + ", *" + name + "*!\n\n" +
  t.desc + "\n\n" + t.choose
);
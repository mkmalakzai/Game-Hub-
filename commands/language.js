/*CMD
  command: language
  help:
  need_reply: false
  folder: CORE
  aliases:
CMD*/

var lang = String(User.getProperty("t5_lang") || "en");

Bot.sendInlineKeyboard(
  [
    [
      {title:"🇺🇸 English",command:"language_set en"},
      {title:"🇪🇸 Español",command:"language_set es"}
    ],
    [
      {title:"🇩🇪 Deutsch",command:"language_set de"},
      {title:"🇫🇷 Français",command:"language_set fr"}
    ],
    [
      {title:"🇹🇷 Türkçe",command:"language_set tr"},
      {title:"🇮🇩 Indonesia",command:"language_set id"}
    ],
    [
      {title:"🇮🇳 हिन्दी",command:"language_set hi"},
      {title:"🇧🇩 বাংলা",command:"language_set bn"}
    ],
    [{title:"⬅️ Main Menu",command:"main_menu"}]
  ],
  "🌐 *LANGUAGE*\n━━━━━━━━━━━━━━\n\nCurrent: *" + lang.toUpperCase() + "*\n\nChoose your preferred interface language."
);
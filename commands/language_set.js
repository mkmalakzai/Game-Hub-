/*CMD
  command: language_set
  help:
  need_reply: false
  folder: CORE
  aliases:
CMD*/

var lang = String(params || "en");
var allowed = ["en","es","de","fr","tr","id","hi","bn"];

if (allowed.indexOf(lang) === -1) lang = "en";

User.setProperty("t5_lang", lang, "string");
Bot.runCommand("main_menu");
/*CMD
  command: trivia
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var qs = [
  {q:"Which planet is known as the Red Planet?",a:"mars",o:["Mars","Venus","Jupiter"]},
  {q:"How many days are in a leap year?",a:"366",o:["365","366","364"]},
  {q:"Which ocean is the largest?",a:"pacific",o:["Atlantic","Pacific","Indian"]},
  {q:"What is 9 × 7?",a:"63",o:["56","63","72"]}
];
var x = qs[Math.floor(Math.random()*qs.length)];
User.setProperty("t5_trivia_answer", x.a, "string");

var kb=[];
for (var i=0;i<x.o.length;i++){
  kb.push([{title:x.o[i],command:"trivia_pick "+x.o[i].toLowerCase()}]);
}
kb.push([{title:"⬅️ Games",command:"games"}]);

Bot.sendInlineKeyboard(kb,"🧠 *TRIVIA QUIZ*\n━━━━━━━━━━━━━━\n\n" + x.q);
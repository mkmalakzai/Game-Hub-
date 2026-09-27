/*CMD
  command: guess_game
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var answer = Math.floor(Math.random()*10)+1;
User.setProperty("t5_guess_answer", answer, "integer");

var kb=[];
for (var i=1;i<=10;i+=2){
  kb.push([
    {title:String(i),command:"guess_pick "+i},
    {title:String(i+1),command:"guess_pick "+(i+1)}
  ]);
}
kb.push([{title:"⬅️ Games",command:"games"}]);

Bot.sendInlineKeyboard(kb,"🔢 *GUESS THE NUMBER*\n━━━━━━━━━━━━━━\n\nI picked a number from *1 to 10*. Choose one:");
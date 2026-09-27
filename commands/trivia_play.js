/*CMD
  command: trivia_play
  help:
  need_reply: false
  folder: GAMES
  aliases:
CMD*/

var difficulty = String(params || "easy").toLowerCase();

var easy = [
  {q:"Which planet is known as the Red Planet?",a:"mars",o:["Mars","Venus","Jupiter","Mercury"]},
  {q:"How many days are in a leap year?",a:"366",o:["365","366","364","360"]},
  {q:"What is 9 × 7?",a:"63",o:["56","63","72","69"]},
  {q:"Which animal is known as the king of the jungle?",a:"lion",o:["Tiger","Lion","Leopard","Wolf"]},
  {q:"Which ocean is the largest?",a:"pacific",o:["Atlantic","Pacific","Indian","Arctic"]},
  {q:"How many sides does a triangle have?",a:"3",o:["3","4","5","6"]},
  {q:"What color do blue and yellow make?",a:"green",o:["Green","Orange","Purple","Brown"]},
  {q:"Which gas do humans need to breathe?",a:"oxygen",o:["Oxygen","Hydrogen","Nitrogen","Helium"]}
];

var medium = [
  {q:"What is the capital of Japan?",a:"tokyo",o:["Tokyo","Kyoto","Osaka","Seoul"]},
  {q:"Which element has the symbol Au?",a:"gold",o:["Silver","Gold","Copper","Iron"]},
  {q:"Who painted the Mona Lisa?",a:"leonardo da vinci",o:["Picasso","Leonardo da Vinci","Van Gogh","Michelangelo"]},
  {q:"How many bones are in an adult human body?",a:"206",o:["196","206","216","226"]},
  {q:"Which planet has the most prominent ring system?",a:"saturn",o:["Mars","Jupiter","Saturn","Neptune"]},
  {q:"What is 15% of 200?",a:"30",o:["20","25","30","35"]},
  {q:"Which continent is Egypt primarily located in?",a:"africa",o:["Asia","Africa","Europe","South America"]},
  {q:"What is the chemical formula for water?",a:"h2o",o:["CO2","H2O","O2","NaCl"]}
];

var hard = [
  {q:"What is the smallest prime number greater than 100?",a:"101",o:["101","103","107","109"]},
  {q:"Which layer of Earth is liquid and surrounds the inner core?",a:"outer core",o:["Mantle","Crust","Outer Core","Lithosphere"]},
  {q:"Who developed the three laws of planetary motion?",a:"johannes kepler",o:["Newton","Galileo","Johannes Kepler","Copernicus"]},
  {q:"What is the SI unit of electric resistance?",a:"ohm",o:["Volt","Ampere","Ohm","Watt"]},
  {q:"Which blood type is the universal red-cell donor?",a:"o negative",o:["AB Positive","O Negative","A Negative","B Positive"]},
  {q:"What is the square root of 1444?",a:"38",o:["36","37","38","39"]},
  {q:"Which language family does Persian belong to?",a:"indo-european",o:["Semitic","Turkic","Indo-European","Sino-Tibetan"]},
  {q:"Which organelle is known as the powerhouse of the cell?",a:"mitochondria",o:["Nucleus","Ribosome","Mitochondria","Golgi apparatus"]}
];

var bank = easy;
if (difficulty == "medium") bank = medium;
if (difficulty == "hard") bank = hard;

var lastIndex = Number(User.getProperty("t5_trivia_last_" + difficulty) || -1);
var index = Math.floor(Math.random() * bank.length);

if (bank.length > 1 && index == lastIndex) {
  index = (index + 1) % bank.length;
}

var x = bank[index];

User.setProperty("t5_trivia_last_" + difficulty, index, "integer");
User.setProperty("t5_trivia_answer", x.a, "string");
User.setProperty("t5_trivia_difficulty", difficulty, "string");

var kb = [];
for (var i=0; i<x.o.length; i++) {
  kb.push([{title:x.o[i],command:"trivia_pick " + x.o[i].toLowerCase()}]);
}
kb.push([{title:"⬅️ Trivia Menu",command:"trivia"}]);

Bot.sendInlineKeyboard(
  kb,
  "🧠 *TRIVIA • " + difficulty.toUpperCase() + "*\n━━━━━━━━━━━━━━\n\n" + x.q
);
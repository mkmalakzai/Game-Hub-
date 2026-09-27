/*CMD
  command: /setup
  help: Initialize GameHub Pro
  need_reply: false
  folder: SETUP
  aliases: setup
CMD*/

var INITIAL_OWNER_ID = "6589090462";

if (!user || !user.telegramid) { return; }

var uid = String(user.telegramid);
var savedOwner = String(Bot.getProperty("t5_owner") || "");
var setupOwner = savedOwner || String(Bot.getProperty("t5_setup_owner") || INITIAL_OWNER_ID);
var ready = Bot.getProperty("t5_setup_done") === "yes" && !!savedOwner;

if (uid !== setupOwner) {
  Bot.sendInlineKeyboard(
    [[{ title: "🏠 Main Menu", command: "main_menu" }]],
    ready
      ? "🔒 Setup is available to the owner only."
      : "🛠 This bot is being configured. Please try again soon."
  );
  return;
}

if (ready) {
  Bot.sendInlineKeyboard(
    [[
      { title: "🛠 Admin Panel", command: "/admin" },
      { title: "🏠 Main Menu", command: "main_menu" }
    ]],
    "✅ *SETUP COMPLETE*\n\nGameHub Pro is already configured."
  );
  return;
}

var action = String(typeof params === "undefined" ? "" : params || "").trim();

if (action === "later") {
  Bot.sendInlineKeyboard(
    [[{ title: "⚙️ Resume Setup", command: "/setup" }]],
    "⏳ Setup paused. Run /setup when you are ready."
  );
  return;
}

if (action !== "confirm") {
  Bot.sendInlineKeyboard(
    [[
      { title: "✅ Complete Setup", command: "/setup confirm" },
      { title: "⏳ Later", command: "/setup later" }
    ]],
    "⚙️ *TPL-005 SETUP*\n\n" +
    "Owner ID: `" + setupOwner + "`\n" +
    "Template: GameHub Pro\n" +
    "Category: Fun & Games\n" +
    "Force Join: Enabled by default\n\n" +
    "Complete setup to activate the admin panel."
  );
  return;
}

Bot.setProperty("t5_owner", setupOwner, "string");
Bot.setProperty("t5_setup_done", "yes", "string");
Bot.setProperty("t5_setup_version", 1, "integer");

if (!Bot.getProperty("fj_enabled")) {
  Bot.setProperty("fj_enabled", "yes", "string");
}

if (!Bot.getProperty("fj_channels")) {
  Bot.setProperty("fj_channels", [], "json");
}

Bot.sendMessage("✅ *SETUP COMPLETE*\n\nGameHub Pro is ready.");
Bot.runCommand("/admin");

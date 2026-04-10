const login = require("./sabbir-fca");
const fs = require("fs");
const logger = require("./utils/log");

const langFile = JSON.parse(fs.readFileSync("./languages/bn.json", "utf8"));

// নামসহ মেসেজ পাঠানোর ফাংশন
const getText = (path, ...args) => {
  const botName = "SABBIR CHAT BOT"; // আপনার নাম
  let text = path.split(".").reduce((obj, key) => obj?.[key], langFile) || path;
  args.forEach((arg, i) => text = text.replace(`%${i + 1}`, arg));
  
  // যদি এটা লগিন বা সিস্টেম মেসেজ না হয়, তবে নামের ট্যাগ যোগ করবে
  if (path.startsWith("commands")) {
      return `[ ${botName} ] : ${text}`;
  }
  return text;
};

module.exports = () => {
  if (!fs.existsSync("./account.txt")) return logger(getText("login.noAppState"), "ERROR");

  const appState = JSON.parse(fs.readFileSync("./account.txt", "utf8"));
  
  login({ appState }, (err, api) => {
    if (err) return logger(getText("login.error", err), "ERROR");

    api.setOptions({ listenEvents: true, selfListen: false, online: true });
    logger(getText("login.success"), "LOGIN");

    api.listenMqtt((err, event) => {
      if (err || !event.body) return;

      const message = event.body.toLowerCase();

      if (message === "hi") {
        api.sendMessage(getText("commands.hi"), event.threadID);
      } 
      else if (message === "prefix") {
        api.sendMessage(getText("commands.prefix"), event.threadID);
      }
    });
  });
};

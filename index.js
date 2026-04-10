const login = require("./sabbir-fca");
const fs = require("fs");
const logger = require("./utils/log");
const express = require('express');

const app = express();
const botName = "SABBIR CHAT BOT";
const langFile = JSON.parse(fs.readFileSync("./languages/bn.json", "utf8"));

const getText = (path, ...args) => {
  let text = path.split(".").reduce((obj, key) => obj?.[key], langFile) || path;
  args.forEach((arg, i) => text = text.replace(`%${i + 1}`, arg));
  return path.startsWith("commands") ? `[ ${botName} ] : ${text}` : text;
};

app.get('/', (req, res) => res.send(`${botName} IS RUNNING...`));
app.listen(3000, () => logger("Uptime Server রেডি!", "INFO"));

module.exports = () => {
  if (!fs.existsSync("./account.txt")) return logger(getText("login.noAppState"), "ERROR");
  const appState = JSON.parse(fs.readFileSync("./account.txt", "utf8"));

  login({ appState }, (err, api) => {
    if (err) return logger(getText("login.error", err), "ERROR");
    api.setOptions({ listenEvents: true, selfListen: false, online: true });
    logger(getText("login.success"), "LOGIN");

    api.listenMqtt((err, event) => {
      if (err || !event.body) return;
      const msg = event.body.toLowerCase();
      if (msg === "hi") api.sendMessage(getText("commands.hi"), event.threadID);
      if (msg === "prefix") api.sendMessage(getText("commands.prefix"), event.threadID);
    });
  });
};

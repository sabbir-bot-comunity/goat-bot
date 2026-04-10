const startBot = require("./index.js");
const fs = require("fs");

const botName = "SABBIR CHAT BOT";
const lang = JSON.parse(fs.readFileSync("./languages/bn.json", "utf8"));

console.log(`\x1b[36m[ ${botName} ]\x1b[0m \x1b[35m🚀 ${lang.system.starting}\x1b[0m`);

try {
    startBot();
} catch (error) {
    console.error(`\x1b[31m[ ${botName} ] ${lang.system.errorStarting}\x1b[0m`, error);
}

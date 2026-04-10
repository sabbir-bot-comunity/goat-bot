const startBot = require("./index.js");

console.log("🚀 Sabbir-Mirai-Bot শুরু হচ্ছে...");

try {
    startBot();
} catch (error) {
    console.error("বট চালু করতে সমস্যা হয়েছে:", error);
}

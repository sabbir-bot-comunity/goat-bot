const login = require("./sabbir-fca");
const fs = require("fs");

module.exports = function() {
    if (!fs.existsSync("./account.txt")) {
        console.error("❗ account.txt ফাইলটি পাওয়া যায়নি!");
        return;
    }

    const appState = JSON.parse(fs.readFileSync("./account.txt", "utf8"));

    login({ appState }, (err, api) => {
        if (err) return console.error("❌ লগইন এরর:", err);

        api.setOptions({ listenEvents: true, selfListen: false });
        console.log("✅ Sabbir-FCA সক্রিয় হয়েছে! বট এখন অনলাইনে।");

        api.listenMqtt((err, event) => {
            if (err) return;

            // সিম্পল টেস্ট কমান্ড
            if (event.type === "message" && event.body) {
                const message = event.body.toLowerCase();
                
                if (message === "prefix") {
                    api.sendMessage("আমার কোনো প্রিক্স নেই, সরাসরি কমান্ড লিখুন।", event.threadID);
                }
                
                if (message === "hi") {
                    api.sendMessage("হ্যালো সাব্বির ভাই! আপনার বট সফলভাবে চলছে। ❤️", event.threadID);
                }
            }
        });
    });
};

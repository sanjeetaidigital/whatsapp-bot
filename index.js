const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const express = require('express');

// --- CONFIGURATION ---
const GOOGLE_SHEET_URL = "YOUR_GOOGLE_WEB_APP_URL_HERE";

// Set up a simple Express server to keep Render happy and allow cron-job pings
const app = express();
app.get('/', (req, res) => res.send('QR Bot is running!'));
app.listen(3000, () => console.log('Web server running on port 3000'));

// Initialize WhatsApp Client with headless browser settings
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Generate and display the QR Code in the console
client.on('qr', (qr) => {
    console.log('SCAN THIS QR CODE WITH YOUR WHATSAPP:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot is connected and ready!');
});

// Listen for incoming messages
client.on('message', async (msg) => {
    const chat = await msg.getChat();
    
    // Ignore group messages
    if (chat.isGroup) return;

    const incomingText = msg.body.toLowerCase().trim();
    const userPhone = msg.from.replace('@c.us', '');
    const userName = msg._data.notifyName || "User";

    // 1. Get user state from Google Sheets
    try {
        const sheetResponse = await axios.post(GOOGLE_SHEET_URL, {
            action: "GET",
            phone: userPhone,
            name: userName
        });
        
        let currentStep = sheetResponse.data.step || 0;
        let lang = sheetResponse.data.language || "";
        let replyText = "";
        let nextStep = currentStep;

        // 2. Core Bot Logic (Trigger & Language Selection)
        if (incomingText.includes('know more') || currentStep === 0) {
            replyText = "Welcome! Please select your preferred language / अपनी भाषा चुनें / আপনার ভাষা বেছে নিন:\n\n1. Hindi 🇮🇳\n2. English 🇬🇧\n3. Bengali 🇧🇩";
            nextStep = 0;
        } 
        else if (currentStep === 0) {
            if (incomingText === '1' || incomingText === 'hindi') lang = 'hi';
            else if (incomingText === '2' || incomingText === 'english') lang = 'en';
            else if (incomingText === '3' || incomingText === 'bengali') lang = 'bn';
            
            if (lang !== "") {
                if (lang === 'en') replyText = "Great! Are you currently a student, working professional, or looking for a side hustle?";
                if (lang === 'hi') replyText = "बहुत बढ़िया! क्या आप अभी स्टूडेंट हैं, जॉब करते हैं, या कोई साइड बिजनेस शुरू करना चाहते हैं?";
                if (lang === 'bn') replyText = "চমৎকার! আপনি কি একজন ছাত্র, চাকরিজীবী, নাকি একটি পার্ট-টাইম ইনকাম করতে চান?";
                
                nextStep = 1;
                // Save chosen language to sheets
                await axios.post(GOOGLE_SHEET_URL, { action: "UPDATE", phone: userPhone, language: lang });
            }
        }
        // ... You will expand this section with steps 1 through 10 using the exact same logic structure ...

        // 3. Send Reply
        if (replyText !== "") {
            client.sendMessage(msg.from, replyText);
        }

        // 4. Update Step in Google Sheets
        if (nextStep !== currentStep) {
            await axios.post(GOOGLE_SHEET_URL, { action: "UPDATE", phone: userPhone, step: nextStep, answer_col: currentStep + 5, answer_val: incomingText });
        }

    } catch (error) {
        console.error("Error communicating with Google Sheets:", error);
    }
});

client.initialize();

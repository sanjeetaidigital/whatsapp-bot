const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const express = require('express');

// --- 1. CONFIGURATION ---
const GOOGLE_SHEET_URL = "YOUR_GOOGLE_WEB_APP_URL_HERE";

// Express server to keep Render awake via cron-job.org
const app = express();
app.get('/', (req, res) => res.send('WhatsApp QR Bot is Active!'));
app.listen(3000, () => console.log('Web server running on port 3000'));

// --- 2. MULTILINGUAL QUESTION BANK ---
const content = {
    langMenu: "Welcome! Please select your preferred language / अपनी भाषा चुनें / আপনার ভাষা বেছে নিন:\n\n1. Hindi 🇮🇳\n2. English 🇬🇧\n3. Bengali 🇧🇩",
    
    en: {
        q1: "Great! Are you currently a student, working professional, or looking for a side hustle?",
        q2: "How many hours a week can you dedicate to learning a new digital skill? (e.g., 2-5 hrs, 5-10 hrs)",
        q3: "Are you ready to take action if you find the right roadmap today? (Reply Yes/No)",
        video: "Awesome! Watch the masterclass video here:\nhttps://youtu.be/bJbMN_kHNpI?si=ViVbwz6LgHn6FQfu\n\nAfter you have seen the video, type *Ready* to proceed further.",
        discount_offer: "Hi! Just a quick update: We are currently running a special discount offer that is valid for the next 6 hours only! ⏳\n\nHave you finished watching the video? Type *Ready* to proceed and claim your discount!",
        q5: "Great! What is the name of the affiliate marketing program mentioned in the video?",
        q6: "Name the 3 courses mentioned in the program (Pro, Premium, Premium Plus).",
        q7: "What are the prices of these 3 courses?",
        q8: "Which course do you think is best for you?",
        q9: "To proceed with joining formalities, do you want guidance through WhatsApp or Call? (Reply 'WhatsApp' or 'Call')",
        q10_call: "What will be your best suitable time to attend the call between 10 AM to 8 PM?",
        end_call: "Perfect! Our expert will call you at your preferred time to guide you with the registration. Talk to you soon!",
        end_whatsapp: "Awesome! Here is your registration link: https://idigitalpreneur.com/token-form-page?ref=292278906\n\nLet us know once you complete the registration!",
        retry_ready: "Please watch the full video first, then type *Ready* to continue.",
        retry_program: "Please enter the correct program name mentioned in the video (iDigitalPreneur) to proceed."
    },
    hi: {
        q1: "बहुत बढ़िया! क्या आप अभी स्टूडेंट हैं, जॉब करते हैं, या कोई साइड बिजनेस शुरू करना चाहते हैं?",
        q2: "आप हर हफ्ते सीखने के लिए कितना समय दे सकते हैं? (जैसे: 2-5 घंटे, 5-10 घंटे)",
        q3: "अगर आपको सही रोडमैप मिले, तो क्या आप आज ही शुरुआत करने के लिए तैयार हैं? (हाँ / Yes लिखें)",
        video: "शानदार! इस मास्टरक्लास वीडियो को यहाँ देखें:\nhttps://youtu.be/ATATMd5Vx_k?si=ptTCR9HozTOmXS09\n\nवीडियो पूरा देखने के बाद, आगे बढ़ने के लिए *Ready* लिखें।",
        discount_offer: "नमस्ते! एक खास जानकारी: अभी हमारा एक स्पेशल डिस्काउंट ऑफर चल रहा है जो केवल अगले 6 घंटों के लिए वैध है! ⏳\n\nक्या आपने वीडियो पूरा देख लिया है? आगे बढ़ने और अपना डिस्काउंट पाने के लिए *Ready* लिखें!",
        q5: "बहुत खूब! वीडियो में बताए गए एफिलिएट मार्केटिंग प्रोग्राम का क्या नाम है?",
        q6: "उसमें बताए गए 3 कोर्सेज के नाम क्या हैं? (Pro, Premium, Premium Plus)",
        q7: "इन तीनों कोर्सेज की कीमतें (prices) क्या हैं?",
        q8: "आपको क्या लगता है, आपके लिए कौन सा कोर्स सबसे अच्छा है?",
        q9: "जॉइनिंग की प्रक्रिया पूरी करने के लिए, क्या आप WhatsApp पर जानकारी चाहते हैं या कॉल पर? (कृपया 'WhatsApp' या 'Call' लिखें)",
        q10_call: "सुबह 10 बजे से रात 8 बजे के बीच आपको कॉल करने का सबसे सही समय क्या होगा?",
        end_call: "बिल्कुल सही! हमारे एक्सपर्ट आपके दिए गए समय पर आपको कॉल करेंगे और रजिस्ट्रेशन में मदद करेंगे। जल्द ही बात होगी!",
        end_whatsapp: "शानदार! यह रहा आपका रजिस्ट्रेशन लिंक: https://idigitalpreneur.com/token-form-page?ref=292278906\n\nपेमेंट पूरा होने के बाद हमें बताएं!",
        retry_ready: "कृपया पूरा वीडियो देखें और आगे बढ़ने के लिए *Ready* लिखें।",
        retry_program: "कृपया वीडियो देखकर सही प्रोग्राम नाम (iDigitalPreneur) लिखें।"
    },
    bn: {
        q1: "চমৎকার! আপনি কি একজন ছাত্র, চাকরিজীবী, নাকি একটি পার্ট-টাইম ইনকাম করতে চান?",
        q2: "আপনি নতুন ডিজিটাল স্কিল শেখার জন্য সপ্তাহে কত ঘণ্টা সময় দিতে পারবেন? (যেমন: ২-৫ ঘণ্টা)",
        q3: "যদি আপনি সঠিক দিকনির্দেশনা পান, তবে কি আজই শুরু করতে প্রস্তুত? (হ্যাঁ / Yes লিখুন)",
        video: "দারুণ! মাস্টারক্লাস ভিডিওটি এখানে দেখুন:\nhttps://youtu.be/ATATMd5Vx_k?si=ptTCR9HozTOmXS09\n\nভিডিওটি সম্পূর্ণ দেখার পর, এগিয়ে যাওয়ার জন্য *Ready* লিখুন।",
        discount_offer: "নমস্কার! একটি বিশেষ আপডেট: বর্তমানে আমাদের একটি স্পেশাল ডিসকাউন্ট অফার চলছে যা শুধুমাত্র পরবর্তী ৬ ঘণ্টার জন্য বৈধ! ⏳\n\nআপনি কি ভিডিওটি সম্পূর্ণ দেখেছেন? এগিয়ে যেতে এবং আপনার ডিসকাউন্ট পেতে *Ready* লিখুন!",
        q5: "খুব ভালো! ভিডিওতে বলা অ্যাফিলিয়েট মার্কেটিং প্রোগ্রামটির নাম কী?",
        q6: "সেখানে বলা ৩টি কোর্সের নাম কী? (Pro, Premium, Premium Plus)",
        q7: "এই ৩টি কোর্সের দাম (prices) কত?",
        q8: "আপনার কী মনে হয়, আপনার জন্য কোন কোর্সটি সবচেয়ে ভালো?",
        q9: "জয়েনিং প্রক্রিয়া সম্পূর্ণ করার জন্য, আপনি কি WhatsApp-এ গাইডেন্স চান নাকি কল-এ? (দয়া করে 'WhatsApp' বা 'Call' লিখুন)",
        q10_call: "সকাল ১০টা থেকে রাত ৮টার মধ্যে আপনাকে কল করার সবচেয়ে ভালো সময় কোনটি?",
        end_call: "চমৎকার! আমাদের এক্সপার্ট আপনার সুবিধামতো সময়ে কল করে রেজিস্ট্রেশন সম্পূর্ণ করতে সাহায্য করবেন। কথা হবে শীঘ্রই!",
        end_whatsapp: "দারুণ! এই নিন আপনার রেজিস্ট্রেশন লিঙ্ক: https://idigitalpreneur.com/token-form-page?ref=292278906\n\nরেজিস্ট্রেশন সম্পূর্ণ করার পর আমাদের জানাবেন!",
        retry_ready: "দয়া করে পুরো ভিডিওটি দেখুন এবং এগিয়ে যাওয়ার জন্য *Ready* লিখুন।",
        retry_program: "দয়া করে ভিডিওটি দেখে সঠিক প্রোগ্রাম নাম (iDigitalPreneur) লিখুন।"
    }
};

// Helper function: Tolerant spelling check for "iDigitalPreneur"
function isIDigitalPreneur(text) {
    const cleaned = text.toLowerCase().replace(/[^a-z]/g, '');
    return cleaned.includes('digital') || cleaned.includes('preneur') || cleaned.includes('idigital');
}

// --- 3. WHATSAPP CLIENT SETUP ---
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', (qr) => {
    console.log('--- SCAN THIS QR CODE IN RENDER LOGS ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot is live and connected!');
});

// --- 4. MESSAGE PROCESSING & BOT LOGIC ---
client.on('message', async (msg) => {
    const chat = await msg.getChat();
    if (chat.isGroup) return;

    const incomingText = msg.body.toLowerCase().trim();
    const userPhone = msg.from.replace('@c.us', '');
    const userName = msg._data.notifyName || "User";

    try {
        // Fetch User State from Google Sheets
        const sheetResponse = await axios.post(GOOGLE_SHEET_URL, {
            action: "GET",
            phone: userPhone,
            name: userName
        });

        let currentStep = Number(sheetResponse.data.step) || 0;
        let lang = sheetResponse.data.language || "";
        let replyText = "";
        let nextStep = currentStep;
        let saveCol = null;

        // --- STEP 0: Trigger / Language Selection ---
        if (incomingText.includes('know more') || currentStep === 0) {
            if (currentStep === 0 && (incomingText === '1' || incomingText === '2' || incomingText === '3' || incomingText.includes('hindi') || incomingText.includes('english') || incomingText.includes('bengali'))) {
                if (incomingText === '1' || incomingText.includes('hindi')) lang = 'hi';
                else if (incomingText === '2' || incomingText.includes('english')) lang = 'en';
                else if (incomingText === '3' || incomingText.includes('bengali')) lang = 'bn';

                replyText = content[lang].q1;
                nextStep = 1;
                await axios.post(GOOGLE_SHEET_URL, { action: "UPDATE", phone: userPhone, language: lang });
            } else {
                replyText = content.langMenu;
                nextStep = 0;
            }
        }
        // --- STEP 1: Occupation ---
        else if (currentStep === 1) {
            saveCol = 6; // Column F
            replyText = content[lang].q2;
            nextStep = 2;
        }
        // --- STEP 2: Dedicated Hours ---
        else if (currentStep === 2) {
            saveCol = 7; // Column G
            replyText = content[lang].q3;
            nextStep = 3;
        }
        // --- STEP 3: Action Readiness (Video Sent) ---
        else if (currentStep === 3) {
            saveCol = 8; // Column H
            replyText = content[lang].video;
            nextStep = 4;

            // --- 60-MINUTE URGENCY TIMER ---
            const targetPhone = msg.from; 
            const targetLang = lang;
            
            setTimeout(async () => {
                try {
                    // Check if the user is STILL at step 4 after 60 mins
                    const checkState = await axios.post(GOOGLE_SHEET_URL, {
                        action: "GET",
                        phone: userPhone,
                        name: userName
                    });
                    
                    if (Number(checkState.data.step) === 4) {
                        client.sendMessage(targetPhone, content[targetLang].discount_offer);
                    }
                } catch (error) {
                    console.error("Error in 60-min follow up:", error);
                }
            }, 60 * 60 * 1000); // 60 minutes in milliseconds
        }
        // --- STEP 4: Video Viewing Check ---
        else if (currentStep === 4) {
            if (incomingText.includes('ready')) {
                replyText = content[lang].q5;
                nextStep = 5;
            } else {
                replyText = content[lang].retry_ready;
            }
        }
        // --- STEP 5: Program Name Quiz (Spelling Tolerant) ---
        else if (currentStep === 5) {
            if (isIDigitalPreneur(incomingText)) {
                saveCol = 9; // Column I
                replyText = content[lang].q6;
                nextStep = 6;
            } else {
                replyText = content[lang].retry_program;
            }
        }
        // --- STEP 6: Course Names ---
        else if (currentStep === 6) {
            saveCol = 10; // Column J
            replyText = content[lang].q7;
            nextStep = 7;
        }
        // --- STEP 7: Course Prices ---
        else if (currentStep === 7) {
            saveCol = 11; // Column K
            replyText = content[lang].q8;
            nextStep = 8;
        }
        // --- STEP 8: Best Course Selection ---
        else if (currentStep === 8) {
            saveCol = 12; // Column L
            replyText = content[lang].q9;
            nextStep = 9;
        }
        // --- STEP 9: WhatsApp or Call Choice ---
        else if (currentStep === 9) {
            saveCol = 13; // Column M
            if (incomingText.includes('call')) {
                replyText = content[lang].q10_call;
                nextStep = 10;
            } else {
                replyText = content[lang].end_whatsapp;
                nextStep = 11; // Finished
            }
        }
        // --- STEP 10: Call Timing Slot ---
        else if (currentStep === 10) {
            saveCol = 14; // Column N
            replyText = content[lang].end_call;
            nextStep = 11; // Finished
        }

        // Send Reply back to user via WhatsApp
        if (replyText !== "") {
            client.sendMessage(msg.from, replyText);
        }

        // Update step and save answer to Google Sheets
        if (nextStep !== currentStep || saveCol !== null) {
            const updateData = { action: "UPDATE", phone: userPhone, step: nextStep };
            if (saveCol !== null) {
                updateData.answer_col = saveCol;
                updateData.answer_val = msg.body;
            }
            await axios.post(GOOGLE_SHEET_URL, updateData);
        }

    } catch (error) {
        console.error("Error processing message:", error);
    }
});

client.initialize();

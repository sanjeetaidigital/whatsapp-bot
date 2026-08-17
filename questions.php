<?php
// questions.php

// Trigger: "Hi, Can I know more about it?"
$language_selection = [
    "text" => "Welcome! Please select your preferred language / अपनी भाषा चुनें / আপনার ভাষা বেছে নিন:\n\n1. Hindi 🇮🇳\n2. English 🇬🇧\n3. Bengali 🇧🇩",
    "options" => ["1" => "hi", "2" => "en", "3" => "bn", "hindi" => "hi", "english" => "en", "bengali" => "bn"]
];

$questions = [
    'en' => [
        1 => "Great! Are you currently a student, working professional, or looking for a side hustle?",
        2 => "How many hours a week can you dedicate to learning a new digital skill? (e.g., 2-5 hrs, 5-10 hrs)",
        3 => "Are you ready to take action if you find the right roadmap today? (Reply Yes/No)",
        
        // Video Step
        4 => "Awesome! Watch the masterclass video here: https://idigitalpreneur.com/affiliate/shared-video-form?videoid=16&userid=YlovK2VHY1VwUDQ9 \n\nAfter you have seen the video, type *Ready* to proceed further.",
        
        // Post-Video Quiz
        5 => "Great! What is the name of the affiliate marketing program mentioned in the video?",
        6 => "Name the 3 courses mentioned in the program.",
        7 => "What are the prices of these 3 courses?",
        8 => "Which course do you think is best for you?",
        
        // Closing
        9 => "To proceed with joining formalities, do you want guidance through WhatsApp or Call? (Reply 'WhatsApp' or 'Call')",
        10 => "What will be your best suitable time to attend the call between 10 AM to 8 PM?",
        
        // Final Messages
        'end_call' => "Perfect! Our expert will call you between your preferred time to guide you with the registration. Talk to you soon!",
        'end_whatsapp' => "Great! Here is your direct registration link: [YOUR_AFFILIATE_LINK]. Let us know once you complete the payment!"
    ],
    'hi' => [
        1 => "बहुत बढ़िया! क्या आप अभी स्टूडेंट हैं, जॉब करते हैं, या कोई साइड बिजनेस शुरू करना चाहते हैं?",
        2 => "आप हर हफ्ते सीखने के लिए कितना समय दे सकते हैं? (जैसे: 2-5 घंटे, 5-10 घंटे)",
        3 => "अगर आपको सही रोडमैप मिले, तो क्या आप आज ही शुरुआत करने के लिए तैयार हैं? (हाँ / Yes लिखें)",
        
        // Video Step
        4 => "शानदार! इस मास्टरक्लास वीडियो को यहाँ देखें: https://idigitalpreneur.com/affiliate/shared-video-form?videoid=4&userid=YlovK2VHY1VwUDQ9 \n\nवीडियो पूरा देखने के बाद, आगे बढ़ने के लिए *Ready* लिखें।",
        
        // Post-Video Quiz
        5 => "बहुत खूब! वीडियो में बताए गए एफिलिएट मार्केटिंग प्रोग्राम का क्या नाम है?",
        6 => "उसमें बताए गए 3 कोर्सेज के नाम क्या हैं?",
        7 => "इन तीनों कोर्सेज की कीमतें (prices) क्या हैं?",
        8 => "आपको क्या लगता है, आपके लिए कौन सा कोर्स सबसे अच्छा है?",
        
        // Closing
        9 => "जॉइनिंग की प्रक्रिया पूरी करने के लिए, क्या आप WhatsApp पर जानकारी चाहते हैं या कॉल पर? (कृपया 'WhatsApp' या 'Call' लिखें)",
        10 => "सुबह 10 बजे से रात 8 बजे के बीच आपको कॉल करने का सबसे सही समय क्या होगा?",
        
        // Final Messages
        'end_call' => "बिल्कुल सही! हमारे एक्सपर्ट आपके दिए गए समय पर आपको कॉल करेंगे और रजिस्ट्रेशन में मदद करेंगे। जल्द ही बात होगी!",
        'end_whatsapp' => "शानदार! यह रहा आपका रजिस्ट्रेशन लिंक: [YOUR_AFFILIATE_LINK]. पेमेंट पूरा होने के बाद हमें बताएं!"
    ],
    'bn' => [
        1 => "চমৎকার! আপনি কি একজন ছাত্র, চাকরিজীবী, নাকি একটি পার্ট-টাইম ইনকাম করতে চান?",
        2 => "আপনি নতুন ডিজিটাল স্কিল শেখার জন্য সপ্তাহে কত ঘণ্টা সময় দিতে পারবেন? (যেমন: ২-৫ ঘণ্টা)",
        3 => "যদি আপনি সঠিক দিকনির্দেশনা পান, তবে কি আজই শুরু করতে প্রস্তুত? (হ্যাঁ / Yes লিখুন)",
        
        // Video Step
        4 => "দারুণ! মাস্টারক্লাস ভিডিওটি এখানে দেখুন: https://idigitalpreneur.com/affiliate/shared-video-form?videoid=4&userid=YlovK2VHY1VwUDQ9 \n\nভিডিওটি সম্পূর্ণ দেখার পর, এগিয়ে যাওয়ার জন্য *Ready* লিখুন।",
        
        // Post-Video Quiz
        5 => "খুব ভালো! ভিডিওতে বলা অ্যাফিলিয়েট মার্কেটিং প্রোগ্রামটির নাম কী?",
        6 => "সেখানে বলা ৩টি কোর্সের নাম কী?",
        7 => "এই ৩টি কোর্সের দাম (prices) কত?",
        8 => "আপনার কী মনে হয়, আপনার জন্য কোন কোর্সটি সবচেয়ে ভালো?",
        
        // Closing
        9 => "জয়েনিং প্রক্রিয়া সম্পূর্ণ করার জন্য, আপনি কি WhatsApp-এ গাইডেন্স চান নাকি কল-এ? (দয়া করে 'WhatsApp' বা 'Call' লিখুন)",
        10 => "সকাল ১০টা থেকে রাত ৮টার মধ্যে আপনাকে কল করার সবচেয়ে ভালো সময় কোনটি?",
        
        // Final Messages
        'end_call' => "চমৎকার! আমাদের এক্সপার্ট আপনার সুবিধামতো সময়ে কল করে রেজিস্ট্রেশন সম্পূর্ণ করতে সাহায্য করবেন। কথা হবে শীঘ্রই!",
        'end_whatsapp' => "দারুণ! এই নিন আপনার রেজিস্ট্রেশন লিঙ্ক: [YOUR_AFFILIATE_LINK]. পেমেন্ট সম্পূর্ণ করার পর আমাদের জানাবেন!"
    ]
];
?>

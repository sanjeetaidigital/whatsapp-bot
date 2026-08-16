<?php
// index.php

$verify_token = "my_secure_token_123"; 
$google_script_url = https://script.google.com/macros/s/AKfycbzNrneKoYnpRRWnftuLYSMmDNuDVbsfY-07Kwz7iIM0hbF8mIX46aoqqiMbvOdXJpxsbg/exec; 

// --- 1. Meta Webhook Verification (GET Request) ---
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['hub_mode'])) {
    if ($_GET['hub_verify_token'] === $verify_token) {
        http_response_code(200);
        echo $_GET['hub_challenge'];
        exit;
    } else {
        http_response_code(403);
        exit;
    }
}

// --- 2. Handle Incoming WhatsApp Messages (POST Request) ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Acknowledge receipt to Meta immediately so they don't resend
    http_response_code(200); 

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Verify the payload contains a user message
    if (isset($data['entry'][0]['changes'][0]['value']['messages'][0])) {
        
        $message_data = $data['entry'][0]['changes'][0]['value'];
        
        // Extract user details
        $phone_number = $message_data['messages'][0]['from'];
        $profile_name = $message_data['contacts'][0]['profile']['name'];
        
        // Prepare the payload for Google Sheets
        $sheet_payload = json_encode([
            "name" => $profile_name,
            "phone" => $phone_number
        ]);

        // Fire the data to Google Apps Script via cURL
        $ch = curl_init($google_script_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $sheet_payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        // Log for debugging inside Render
        error_log("Saved to Sheets: " . $response);
    }
    exit;
}

echo "WhatsApp Bot Webhook is Active & Connected to Sheets!";
?>

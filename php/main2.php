<?php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_REQUEST['getTrip'])) {

    // echo 'ok'; return

    // Get the JSON data from the request body
    $requestData = json_decode(file_get_contents('php://input'), true);

    $dateString = $requestData['date'];
    $dateTime = new DateTime($dateString);
    $formattedDate = $dateTime->format('d-m-Y');

    $from = $requestData['from'];
    // if ($from == 'pb') {$from = 'Port Blair';}
    // else if ($from == 'hl') {$from = 'Swaraj Dweep';}
    // else {$from = 'Shaheed Dweep';};

    $to = $requestData['to'];
    // if ($to == 'pb') {$to = 'Port Blair';}
    // else if ($to == 'hl') {$to = 'Swaraj Dweep';}
    // else {$to = 'Shaheed Dweep';};
 
    $userName = 'andamanbookings';
    $token = 'U2FsdGVkX1+iuapxY7XIKxLqtZY7Ye57mU78c+BBNX04u8VEEMgrMEQY3xRT2C29g2YGiwCUTpP5duG34vXaUExuKkOwutgfK62uIyv3ZgU=';

    // Modify the values of userRouteInput as needed
    $userRouteInput = [
        "date" => $formattedDate,
        "from" => $from,
        "to" => $to,
        "userName" => $userName,
        "token" => $token,
        // Add or modify other properties as needed
    ];

    // Convert the modified userRouteInput back to JSON
    $modifiedRequestData = json_encode($userRouteInput);

    // Set up cURL
    $ch = curl_init("http://api.dev.gonautika.com:8012/getTripData");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $modifiedRequestData);

    // Execute cURL request
    $response = curl_exec($ch);

    // Check for errors
    if (curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
    }

    // Close cURL session
    curl_close($ch);

    // Return the API response
    echo $response;
}else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_REQUEST['getTrip'])) {

  
    echo $response;
} else {
    // Handle cases where the request method is not POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}
?>

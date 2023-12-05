<?php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Now $requestData contains the parsed JSON data
    // Access the data as needed
    $dateString = $requestData['date'];
    $dateTime = new DateTime($dateString);
    $formattedDate = $dateTime->format('d-m-Y');

    $date = $formattedDate;
    $from = $requestData['from'];
    if($from == 'pb'){
        $from = 'Port Blair';
    }else    if($from == 'pb'){
        $from = 'Port Blair';
    }else{
        $from = 'Shaheed Dweep';
    }
    $to = $requestData['to'];
    $userName = $requestData['userName'];
    $token = $requestData['token'];

    // Perform your logic with the data
    // ...

    // Echo the date (for testing purposes)
    echo $fromShort;
    // json_encode(['Date' => $date]);
} else {
    // Handle cases where the request method is not POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}

?>

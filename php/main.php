<?php

if(isset($_POST['getTrip'])){
   return getTrip ();
   
   $dateString = "2023-12-16";
   $dateTime = new DateTime($dateString);
   $formattedDate = $dateTime->format('d-m-Y');
}

function getTrip (){
    // Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Set the target API endpoint
$apiEndpoint = "http://api.dev.gonautika.com:8012/getTripData";

// Extract the request method and data
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestData = file_get_contents('php://input');

// Set up cURL
$ch = curl_init($apiEndpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $requestMethod);
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData);

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
}

?>

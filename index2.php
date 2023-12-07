<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Details</title>
    <link rel="stylesheet" href="css/util.css">
    <link rel="stylesheet" href="css/main.css">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="btns">
    <a href="#" class="btn">Pay Now</a>
    </div>
    <?php
    // Check if the 'data' parameter is set in the URL
    if (isset($_GET['data'])) {
        // Decode the JSON data
        $jsonData = json_decode(urldecode($_GET['data']), true);

        // Output booking data
        echo "<h2>Booking Details</h2>";
        echo "Booking Timestamp: " . date('Y-m-d H:i:s', $jsonData['bookingData'][0]['bookingTS']) . "<br>";
        echo "Booking ID: " . $jsonData['bookingData'][0]['id'] . "<br>";
        echo "Trip ID: " . $jsonData['bookingData'][0]['tripId'] . "<br>";
        echo "Vessel ID: " . $jsonData['bookingData'][0]['vesselID'] . "<br>";
        echo "From: " . $jsonData['bookingData'][0]['from'] . "<br>";
        echo "To: " . $jsonData['bookingData'][0]['to'] . "<br>";

        // Output passenger data in a table
        echo "<h2>Passenger Details</h2>";
        echo "Booking ID: " . $jsonData['bookingData'][0]['id'] . "<br>";
        echo "<table>";
        echo "<tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Nationality</th><th>Passport</th><th>Tier</th><th>Seat</th><th>Is Cancelled</th></tr>";

        foreach ($jsonData['bookingData'][0]['paxDetail']['pax'] as $passenger) {
            echo "<tr>";
            echo "<td>" . $passenger['id'] . "</td>";
            echo "<td>" . $passenger['name'] . "</td>";
            echo "<td>" . $passenger['age'] . "</td>";
            echo "<td>" . $passenger['gender'] . "</td>";
            echo "<td>" . $passenger['nationality'] . "</td>";
            echo "<td>" . $passenger['passport'] . "</td>";
            // echo "<td>" . $passenger['tier'] . "</td>";
            // echo "<td>" . $passenger['seat'] . "</td>";
            // echo "<td>" . ($passenger['isCancelled'] ? 'Yes' : 'No') . "</td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        // If 'data' parameter is not set, display an error message
        echo "Error: Data parameter not found in the URL.";
    }
    ?>
</body>
</html>

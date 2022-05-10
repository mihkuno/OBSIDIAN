<?php
// url direct access isn't permitted
// defined('_DEFVAR') or header("Location: ../../index.php");

// connecting the database
$dbServername = 'localhost';    // server address
$dbUsername = 'root';           // root username
$dbPassword = '';  // root password
$dbName = 'OBSIDIAN';

// Create connection
$conn = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);


// getting data from the users table
$result = $conn -> query("SELECT user,email,profile FROM `credentials`");

// storing in array
$data = array();

while($row = $result -> fetch_assoc()) {
    $data[] = $row;
}

// returning response in JSON format
echo json_encode($data);
<?php
session_start();

// the user is not logged in
if (!isset($_SESSION['user'], $_SESSION['passw'], $_SESSION['profile']))
{ 
	// clear session data
    session_unset();
    session_destroy();
    session_write_close();
    session_regenerate_id(true);

	// bring them back to sign in page
    header("Location: signin.php");
    die("Redirecting to: signin.php"); 
}

// connecting the database
$dbServername = 'localhost';    // server address
$dbUsername   = 'root';           // root username
$dbPassword   = 'password_here';  // root password
$dbUser       = 'user_'.$_SESSION['user']; // (user_name) database 

// create connection
$conn = new mysqli($dbServername, $dbUsername, $dbPassword, 'user_miko');

// get the table information

$namecol = $conn->query("SELECT * FROM `information` ORDER BY `sort` ASC");

// check if table is not created
if (!empty($namecol)) { 
    $tables = [];
    foreach($namecol as $row) {
        array_push($tables, $row);
    }
    // returning response in JSON format
    echo json_encode($tables);


    // getdata from the users table
    // $result = $conn -> query("SELECT user,email,profile FROM `credentials`");

    // // storing in array
    // $data = array();

    // while($row = $result -> fetch_assoc()) {
    //     $data[] = $row;
    // }
}
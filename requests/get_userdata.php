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


$type = $_POST['type'];

switch ($type) {
    case "table":
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
        }
    break;
    case "row":
        // get the table name
        $table = $_POST['table'];

        $bucket = []; // get all rows of the table 
        $rowdata = $conn->query("SELECT * FROM `$table` ORDER BY `sort` ASC");
        
        // bucket the row data   
        foreach($rowdata as $data) {
            array_push($bucket, $data);
        }

        // send the bucket
        echo json_encode($bucket);
    break;
}

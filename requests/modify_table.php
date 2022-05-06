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

// otherwise, post the create table 
else {
    // set instance variables
    $user = $_SESSION['user'];
    $database = 'user_miko';
    $componentID = $_POST['table'];
    $operation = $_POST['operation'];

    // connect to user database
    $dbServername = 'localhost';    // server address
    $dbUsername = 'root';           // root username
    $dbPassword = 'password_here';  // root password

    // Create connection
    $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $database);

    if ($conn -> connect_error) {
        echo "Connection failed: " . $conn->connect_error.'<br><br>';
    } else {


        switch ($operation) {
            case "create":
                $sql = "
                CREATE TABLE `$componentID` (
                    `id` int NOT NULL,
                    `label` varchar(50) DEFAULT NULL,
                    `status` varchar(10) NOT NULL DEFAULT 'Soon',
                    `start_date` date DEFAULT NULL,
                    `end_date` date DEFAULT NULL,
                    `owner` varchar(100) DEFAULT NULL,
                    `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (`id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                ";
                if ($conn->query($sql)) {
                    echo "success, table created";
                } else {
                    echo "failed to create table";
                }
            break;

            case "drop":
                $sql = "DROP TABLE `$componentID`";
                if ($conn->query($sql)) {
                    echo "success, table removed";
                } else {
                    echo "failed to remove table";
                }
            break;
        }
    }
}
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
$dbPassword   = '';  // root password

// create connection
$conn = new mysqli($dbServername, $dbUsername, $dbPassword);


$type = $_POST['type'];

switch ($type) {
    case "table":
        // (user_name) database
        $dbUser = sprintf("user_%s",$_SESSION['user']);  
        $conn->select_db($dbUser);

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
        // (user_name) database
        $dbUser = sprintf("user_%s",$_SESSION['user']);  
        $conn->select_db($dbUser);

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
    case "daterange":
        // (user_name) database
        $dbUser = sprintf("user_%s",$_SESSION['user']);  
        $conn->select_db($dbUser);

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
    case "rowcount":
        // (user_name) database
        $dbUser = sprintf("user_%s",$_SESSION['user']);  
        $conn->select_db($dbUser); 

        // get the number of tables of user data
        $tableinfo = $conn->query("SELECT `name` FROM `information`");

        $count = 0;
        foreach($tableinfo as $x) {
            foreach($x as $tname) {
                $rowinfo = $conn->query("SELECT `name` FROM `$tname`");
                foreach($rowinfo as $y) {
                    foreach($y as $rname) {
                        $count++;
                    }
                }
            }
        }
        echo $count;
    break;
    case "rownames":
        // (user_name) database
        $dbUser = sprintf("user_%s",$_SESSION['user']);  
        $conn->select_db($dbUser); 

        // get the number of tables of user data
        $tableinfo = $conn->query("SELECT `name` FROM `information`");

        $originSort = [];
        foreach($tableinfo as $x) {
            foreach($x as $tname) {
                $rowinfo = $conn->query("SELECT `name` FROM `$tname`");
                foreach($rowinfo as $y) {
                    foreach($y as $rname) {
                        array_push($originSort,$rname);
                    }
                }
            }
        }
        echo json_encode($originSort);
    break;
}

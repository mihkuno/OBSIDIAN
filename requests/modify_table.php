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
    $tablename = $_POST['table'];
    $operation = $_POST['operation'];

    // connect to user database
    $dbServername = 'localhost';    // server address
    $dbUsername = 'root';           // root username
    $dbPassword = 'password_here';  // root password

    // Create connection
    $conn = new mysqli($dbServername, $dbUsername, $dbPassword, $database);

    if ($conn -> connect_error) { echo "Connection failed"; } 
    else {
        switch ($operation) {
            case "create":
                $sort = $_POST['sort'];
                
                // create the information table if it doesnt exist
                $create_information = "
                CREATE TABLE IF NOT EXISTS `information` (
                    `sort` int NOT NULL,
                    `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                    `label` varchar(20) DEFAULT NULL,
                    UNIQUE KEY `id` (`name`),
                    KEY `sort` (`sort`)
                  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                ";
                $conn->query($create_information);

                // create the new table component to database
                $create_table = "
                CREATE TABLE `$tablename` (
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
                $conn->query($create_table);

                // insert table data to information
                $update_information = "
                INSERT INTO `information` (`sort`, `name`, `label`) VALUES ('$sort', '$tablename', 'assdfadf');
                ";
                $conn->query($update_information);
                
            break;
            case "drop":
                // remove the table
                $sql = "DROP TABLE `$tablename`";
                $conn->query($sql);

                // remove the table info
                $info = "DELETE FROM `information` WHERE `information`.`name` = '$tablename'";
                $conn->query($info);

                // reset the sort from 0
                // returns an associative array name=>tablecard-0
                $sql = $conn->query('SELECT `name` from `information`');
                $count=0;
                foreach($sql as $namecol) {
                    $name = $namecol['name'];
                    $reset = "UPDATE `information` SET sort = $count WHERE name = '$name'";
                    $conn->query($reset);
                    echo json_encode($name);
                $count++;
                }
            break;
        }
    }
}
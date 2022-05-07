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
            case "create": // creating tables
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
                CREATE TABLE IF NOT EXISTS `$tablename` (
                    `sort` int NOT NULL,
                    `name` varchar(50) NOT NULL,
                    `label` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                    `status` varchar(10) NOT NULL DEFAULT 'Soon',
                    `start_date` date NOT NULL,
                    `end_date` date NOT NULL,
                    `owner` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                    `modified` int NOT NULL,
                    PRIMARY KEY (`name`)
                  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                ";
                $conn->query($create_table);

                // insert table data to information
                $update_information = "
                INSERT INTO `information` (`sort`, `name`, `label`) VALUES ('$sort', '$tablename', 'assdfadf');
                ";
                $conn->query($update_information);
                
            break;
            case "drop": // deleting tables
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
            case "sort": // sorting tables
                // returns an associative array name=>tablecard-0
                $sql = $conn->query('SELECT `name` from `information`');
                
                // sorted array of the tables
                $sorted = explode(',',$tablename);
                    
                // starting from the sorted array
                // reset the index associated of its name 
                $count=0;
                foreach($sorted as $name) {
                    $reset = "UPDATE `information` SET sort = $count WHERE name = '$name'";
                    $conn->query($reset);
                $count++;
                }
            break;
            case "addrow": // adding new row to self table
                $rowinfo = $_POST['row'];

                // split by string commas except inside square brackets
                $data = preg_split('/(,)(?![^[]*\])/',$_POST['row']);

                $sort = (int) $data[0]; // integer index
                $name       = $data[1]; // remain string
                $label      = $data[2]; // remain string
                $status     = $data[3]; // remain string
                $start_date = $data[4]; // remain string
                $end_date   = $data[5]; // remain string
                $owner      = $data[6]; // remain string
                $modified   = $data[7]; // remain string

                // insert newrow data to user table
                $newrow = "
                INSERT INTO `$tablename` (`sort`,`name`, `label`, `status`, `start_date`, `end_date`, `owner`, `modified`) 
                VALUES ($sort, '$name', '$label', '$status', '$start_date', '$end_date', '$owner', '$modified');
                ";
                $conn->query($newrow);
                
                echo print_r($data);
            break;
            case "rowsort": // sorting row on same table
                // a stringed array
                $sequence = $_POST['row'];

                // sorted array of the rows
                $sorted = explode(',',$sequence);

                // query the name column of target table 
                // returns an associative array name=>tablecard-0
                $sql = $conn->query("SELECT `name` from `$tablename`");
             
                // starting from the sorted array
                // reset the index associated of its name 
                $count=0;
                foreach($sorted as $name) {
                    $reset = "UPDATE `$tablename` SET sort = $count WHERE name = '$name'";
                    $conn->query($reset);
                $count++;
                }
            break;
            case "rowpass": // transfer row to another table
                $from_table = $tablename;
                $to_table   = $_POST['target'];

                $previous_rows = explode(',',$_POST['from']);
                $target_rows = explode(',',$_POST['to']);

                // -- COPY TARGET_ROWS INTO TO_TABLE --
                
                // loop target_row in from_table, then copy it to_table
                foreach($target_rows as $row) {
                    $sql = "INSERT INTO `$to_table` SELECT * FROM `$from_table` WHERE name='$row'";
                    $conn->query($sql);
                }
                    

                // -- RESET SORT INDEX ASSOCIATED TO START OF THE ARRAY --
                
                // query the name column of target table 
                $sql = $conn->query("SELECT `name` from `$to_table`");

                $count=0;
                foreach($target_rows as $name) {
                    $reset = "UPDATE `$to_table` SET sort = $count WHERE name = '$name'";
                    $conn->query($reset);
                $count++;
                }

                // -- DROP THE TARGET ROWS OF THE PREVIOUS TABLE --

                // query the name column of target table 
                $sql = $conn->query("SELECT `name` from `$from_table`");

                $count=0;
                foreach($target_rows as $name) {
                    $transferred = "DELETE FROM `$from_table` WHERE name = '$name'";
                    $conn->query($transferred);
                $count++;
                }

                // -- RESET SORT THE PREVIOUS ROWS --

                // query the name column of target table 
                $sql = $conn->query("SELECT `name` from `$from_table`");

                $count=0;
                foreach($previous_rows as $name) {
                    $reset = "UPDATE `$from_table` SET sort = $count WHERE name = '$name'";
                    $conn->query($reset);
                $count++;
                }

                echo print_r($target_rows);
            break;
        }
    }
}
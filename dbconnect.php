<?php

$dbServername = 'localhost';    // server address
$dbUsername = 'root';           // root username
$dbPassword = 'password_here';  // root password

// Create connection
$conn = new mysqli(
    $dbServername, $dbUsername, $dbPassword);

// Check connection
if ($conn -> connect_error) {
    die("Connection failed: " . $conn->connect_error.'<br><br>');
}
else { 
    echo "Host information: " . $conn -> host_info .'<br><br>';


    // // Create database
    // $sql = "CREATE DATABASE OBSIDIAN";
    // // Check database creation
    // if ($conn -> query($sql) === TRUE) {
    //     echo "Database 'OBSIDIAN' created successfully<br><br>";
    // } else {
    //     echo "Error creating 'OBSIDIAN' database: " . $conn->error .'<br><br>';
    // }


    // Select database
    if($conn -> select_db('OBSIDIAN') === TRUE) {
        echo "Database 'OBSIDIAN' selected successfully<br><br>";
    } else {
        echo "Error selecting 'OBSIDIAN' database: " . $conn->error .'<br><br>';
    }


    // // Create table
    // $sql = "
    // CREATE TABLE CREDENTIALS (
    //     id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    //     user VARCHAR(50) UNIQUE,
    //     email VARCHAR(50) NOT NULL UNIQUE,
    //     passw VARCHAR(50) NOT NULL,
    //     profile VARCHAR(100)
    // );";

    // // Check table creation
    // if ($conn -> query($sql) === TRUE) {
    //     echo "Table 'CREDENTIALS' created successfully<br><br>";
    // }   else {
    //     echo "Could not create table 'CREDENTIALS': " . $conn -> error .'<br><br>';
    // }


    // // Insert values
    // $sql = "
    // INSERT INTO CREDENTIALS 
    //     (user, email, passw, profile) 
    // VALUES 
    //     ('msadfoz', 'csadfai@gSADFail.com', 'passw', '/image/hiho')
    // ";

    // if ($conn -> query($sql) === TRUE) {
    //     echo "Values to 'CREDENTIALS' inserted successfully<br><br>";
    // }   else {
    //     echo "Could not insert values to 'CREDENTIALS': " . $conn -> error .'<br><br>';
    // }


    // $conn -> close();
}

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
    require 'connect.php';

    // set instance variables
    $user = $_SESSION['user'];
    $description = $_POST['input'];
    $report = $conn->query("UPDATE `credentials` SET `desc` = '$description' WHERE `user` = '$user'");

    echo $report;
}
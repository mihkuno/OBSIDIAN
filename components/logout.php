<?php 
// url direct access isn't permitted
defined('_DEFVAR') or header("Location: ../index.php");
?>

<?php
    session_start();
    unset($_SESSION);
    session_destroy();
    session_write_close();
    header('Location: ../index.php');
    die;

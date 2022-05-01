<?php 
// url direct access isn't permitted
defined('_DEFVAR') or header("Location: ../index.php");
?>

<?php
session_start();

echo "<script>console.log('logged out')</script>";
// clear and delete the cookies 
if (isset($_COOKIE['user']) || 
    isset($_COOKIE['passw']) || 
    isset($_COOKIE['profile'])
){
    unset($_COOKIE['user']); 
    unset($_COOKIE['passw']); 
    unset($_COOKIE['profile']);
    setcookie('user', null, -1, '/');
    setcookie('passw', null, -1, '/'); 
    setcookie('profile', null, -1, '/'); 
}
// clear the session
unset($_SESSION);
session_destroy();
session_write_close();
header('Location: ../index.php');
die;

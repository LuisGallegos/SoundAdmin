
<?php
/*
*
*   @author: Luis Gallegos
*   @author: Francisco Lozano
*   @version: 1.0
*
*   This is the php file that destroys the current session for the Login project.
*
*/
include('../js/app/controllers/loginController.php');
session_id("active");
session_start();
unset($_SESSION['username']);
$_SESSION = array();

//DELETES THE COOKIES
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 42000, '/');
}

//DESTROYS SESSION AND REDIRECTS TO INDEX
session_destroy();
header('Location: ../views/login.php');
?>

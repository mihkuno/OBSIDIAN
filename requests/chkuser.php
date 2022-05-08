<?php

switch ($_SESSION['active']) {
	// on login or signup - no user session
	case "validate":
		// a user is already logged in
		if(isset($_SESSION['user'])&&isset($_SESSION['passw'])&&isset($_SESSION['profile']) 
		){
			// bring them back to the dashboard 
			header("Location: index.php");
			die("Redirecting to: index.php"); 
		}
	break;
	case "dashboard": // on other pages - there is a user session
		// if a user-profile cookie is active
		if (isset($_COOKIE['user'])&&isset($_COOKIE['passw'])&&isset($_COOKIE['profile']) 
		){
			// use the cookies as the session
			$_SESSION['user'] = $_COOKIE['user'];
			$_SESSION['passw'] = $_COOKIE['passw'];
			$_SESSION['profile'] = $_COOKIE['profile'];
			echo "<script>console.log('a cookie session was used')</script>";
		}

		// the user is not logged in
		else if (!isset($_SESSION['user'])&&!isset($_SESSION['passw'])&&!isset($_SESSION['profile']) 
		){ 
			// clear session data
			session_unset();
			session_destroy();
			session_write_close();
			session_regenerate_id(true);

			// bring them back to sign in page
			header("Location: signin.php");
			die("Redirecting to: signin.php"); 
		} 
		else { echo "<script>console.log('there were no cookies available')</script>"; }
	break;
	case "charts": // on other pages - there is a user session
		// if a user-profile cookie is active
		if (isset($_COOKIE['user'])&&isset($_COOKIE['passw'])&&isset($_COOKIE['profile']) 
		){
			// use the cookies as the session
			$_SESSION['user'] = $_COOKIE['user'];
			$_SESSION['passw'] = $_COOKIE['passw'];
			$_SESSION['profile'] = $_COOKIE['profile'];
			echo "<script>console.log('a cookie session was used')</script>";
		}

		// the user is not logged in
		else if (!isset($_SESSION['user'])&&!isset($_SESSION['passw'])&&!isset($_SESSION['profile']) 
		){ 
			// clear session data
			session_unset();
			session_destroy();
			session_write_close();
			session_regenerate_id(true);

			// bring them back to sign in page
			header("Location: signin.php");
			die("Redirecting to: signin.php"); 
		} 
		else { echo "<script>console.log('there were no cookies available')</script>"; }
	break;
}

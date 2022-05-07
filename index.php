<?php 
// base page (allow url direct access):
define('_DEFVAR', 1);

include 'components/head.php';
// if a user-profile cookie is active
if (isset($_COOKIE['user'], $_COOKIE['passw'], $_COOKIE['profile'])
){
	// use the cookies as the session
	$_SESSION['user'] = $_COOKIE['user'];
	$_SESSION['passw'] = $_COOKIE['passw'];
	$_SESSION['profile'] = $_COOKIE['profile'];
	echo "
	<script>
	console.log('a cookie session was used')
	</script>";
}
// the user is not logged in
else if (!isset($_SESSION['user'], $_SESSION['passw'], $_SESSION['profile']))
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
else {
	echo "
	<script>
	console.log('there were no cookies available')
	</script>";}
?>
<body data-background-color="dark">
<div class="wrapper">
	<?php include 'components/header.php'?>
	<?php include 'components/sidebar.php'?>		

	<div class="main-panel">
		<div class="content">
			<div class="page-inner m-3">
				<?php include 'components/navbar.php'?>
				<?php include 'components/actionbar.php'?>

				<div class="page-category" id="index-content">
					<!-- Inner page content  goes here -->


						<div id="loader" class="card-body is-loading is-loading-lg loader"></div>
		
					
					<!-- TABLE APPENDED HERE -->						
				</div>
			</div>
		</div>	
		<?php include 'components/footer.php'?>
	</div>
</div>
<?php include 'components/scripts.php'?>
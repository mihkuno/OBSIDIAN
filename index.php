<?php include 'components/head.php';
// the user is not logged in
if (!isset($_SESSION['user']))
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
					
					<!-- TABLE APPENDED HERE -->						
				</div>
			</div>
		</div>	
		<?php include 'components/footer.php'?>
	</div>
</div>
<?php include 'components/scripts.php'?>
<?php 
// base page (allow url direct access):
define('_DEFVAR', 1);

// include head and start session
include 'components/head.php';

// pass to head to check user session
$_SESSION['active'] = 'dashboard';

// check user session
require 'requests/chkuser.php';
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

						<!-- SPINNING LOADER -->
						<div id="loader" class="card-body is-loading is-loading-lg loader"></div>
		
					
					<!-- TABLE APPENDED HERE -->						
				</div>
			</div>
		</div>	
		<?php include 'components/footer.php'?>
	</div>
</div>
<?php include 'components/scripts.php'?>

<!-- LOCAL: CUSTOM SCRIPTS -->
<script src="components/scripts.js"></script>
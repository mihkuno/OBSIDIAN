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

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>


<?php include 'components/scripts.php'?>
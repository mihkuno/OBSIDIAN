<?php 
// base page (allow url direct access):
define('_DEFVAR', 1);

// include head and start session
include 'components/head.php';

// pass to head to check user session
$_SESSION['active'] = 'summary';

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
				<div class="page-category">
					<!-- Inner page content goes here -->

					<?php include 'components/profile.php'?>
					<?php //include 'components/activity.php'?>
					<?php include 'components/calendar.php'?>					

				</div>
			</div>
		</div>
		<?php include 'components/footer.php'?>
	</div>
</div>
<?php include 'components/scripts.php'?>
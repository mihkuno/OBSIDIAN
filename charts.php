<?php 
// base page (allow url direct access):
define('_DEFVAR', 1);

// include head and start session
include 'components/head.php';

// pass to head to check user session
$_SESSION['active'] = 'charts';

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
				<!-- HEADER -->
				<div class="page-header">
					<!-- PAGE TITLE -->
					<h4 class="page-title">Summary</h4>
					<!-- BREADCRUMBS -->
					<ul class="breadcrumbs">
						<li class="nav-home">
							<a href="#">
								<i class="flaticon-home"></i>
							</a>
						</li>
						<li class="separator">
							<i class="flaticon-right-arrow"></i>
						</li>
						<li class="nav-item">
							<a href="#">Panels</a>
						</li>
						<li class="separator">
							<i class="flaticon-right-arrow"></i>
						</li>
						<li class="nav-item">
							<a href="#">Summary</a>
						</li>
					</ul>
				</div>
				<!-- END HEADER -->
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
<script src="components/summary.js"></script>
<?php include 'components/scripts.php'?>
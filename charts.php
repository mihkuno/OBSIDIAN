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
								<a href="#">Calendar</a>
							</li>
						</ul>
					</div>
					<!-- END HEADER -->
					<div class="page-category">
						<!-- Inner page content goes here -->

						<div class="row">
							<div class="col-md-12">
								<div class="card card-profile">
									<div class="card-header" style="background-image: url('../assets/img/blogpost.jpg')">
										<div class="profile-picture">
											<div class="avatar avatar-xl">
												<img src="<?php echo $_SESSION['profile'] ?>" alt="..." class="avatar-img rounded-circle">
											</div>
										</div>
									</div>
									<div class="card-body">
										<div class="user-profile text-center">
											<div class="name"><?php echo $_SESSION['user'] ?></div>
											<div class="job">Computer Scientist</div>
											<div class="desc">That's very kewl</div>
											<!-- <div class="social-media">
												<a class="btn btn-info btn-twitter btn-sm btn-link" href="#"> 
													<span class="btn-label just-icon"><i class="flaticon-twitter"></i> </span>
												</a>
												<a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#"> 
													<span class="btn-label just-icon"><i class="flaticon-google-plus"></i> </span> 
												</a>
												<a class="btn btn-primary btn-sm btn-link" rel="publisher" href="#"> 
													<span class="btn-label just-icon"><i class="flaticon-facebook"></i> </span> 
												</a>
												<a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#"> 
													<span class="btn-label just-icon"><i class="flaticon-dribbble"></i> </span> 
												</a>
											</div> -->
											<!-- <div class="view-profile">
												<a href="#" class="btn btn-secondary btn-block">View Full Profile</a>
											</div> -->
										</div>
									</div>
									<!-- <div class="card-footer">
										<div class="row user-stats text-center">
											<div class="col">
												<div class="number">125</div>
												<div class="title">Post</div>
											</div>
											<div class="col">
												<div class="number">25K</div>
												<div class="title">Followers</div>
											</div>
											<div class="col">
												<div class="number">134</div>
												<div class="title">Following</div>
											</div>
										</div>
									</div> -->
								</div>
							</div>
						</div>


						<div class="row">
							<div class="col-md-8">
								<div class="card">
									<div class="card-header">
										<div class="card-head-row">
											<div class="card-title">User Statistics</div>
											<div class="card-tools">
												<a href="#" class="btn btn-info btn-border btn-round btn-sm mr-2">
													<span class="btn-label">
														<i class="fa fa-pencil"></i>
													</span>
													Export
												</a>
												<a href="#" class="btn btn-info btn-border btn-round btn-sm">
													<span class="btn-label">
														<i class="fa fa-print"></i>
													</span>
													Print
												</a>
											</div>
										</div>
									</div>
									<div class="card-body">
										<div class="chart-container" style="min-height: 375px"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
											<canvas id="statisticsChart" width="983" height="375" style="display: block; width: 983px; height: 375px;" class="chartjs-render-monitor"></canvas>
										</div>
										<div id="myChartLegend"><ul class="0-legend html-legend"><li><span style="background-color:#f3545d"></span>Subscribers</li><li><span style="background-color:#fdaf4b"></span>New Visitors</li><li><span style="background-color:#177dff"></span>Active Users</li></ul></div>
									</div>
								</div>
							</div>
				
							<div class="col-md-4">
								<div class="card">
									<div class="card-header">
										<div class="card-title">Feed Activity</div>
									</div>
									<div class="card-body">
										<ol class="activity-feed">
											<li class="feed-item feed-item-secondary">
												<time class="date" datetime="9-25">Sep 25</time>
												<span class="text">Responded to need <a href="#">"Volunteer opportunity"</a></span>
											</li>
											<li class="feed-item feed-item-success">
												<time class="date" datetime="9-24">Sep 24</time>
												<span class="text">Added an interest <a href="#">"Volunteer Activities"</a></span>
											</li>
											<li class="feed-item feed-item-info">
												<time class="date" datetime="9-23">Sep 23</time>
												<span class="text">Joined the group <a href="single-group.php">"Boardsmanship Forum"</a></span>
											</li>
											<li class="feed-item feed-item-warning">
												<time class="date" datetime="9-21">Sep 21</time>
												<span class="text">Responded to need <a href="#">"In-Kind Opportunity"</a></span>
											</li>
											<li class="feed-item feed-item-danger">
												<time class="date" datetime="9-18">Sep 18</time>
												<span class="text">Created need <a href="#">"Volunteer Opportunity"</a></span>
											</li>
											<li class="feed-item">
												<time class="date" datetime="9-17">Sep 17</time>
												<span class="text">Attending the event <a href="single-event.php">"Some New Event"</a></span>
											</li>
										</ol>
									</div>
								</div>
							</div>

						</div>

						<!-- SPINNING LOADER -->
						<!-- <div id="loader" class="card-body is-loading is-loading-lg loader"></div> -->

						<div class="row row-card-no-pd">
							<div class="col-md-12 bg-dark2">
								<div class="card">
									<div class="card-body calendar"></div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<?php include 'components/footer.php'?>
		</div>
	</div>

<!-- CALENDAR LIBRARY -->
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/lib/moment.min.js'></script>
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/lib/jquery.min.js'></script>
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/lib/jquery-ui.min.js'></script>
<script src='https://fullcalendar.io/js/fullcalendar-3.1.0/fullcalendar.min.js'></script>
<script src="components/calendar.js"></script>
<?php include 'components/scripts.php'?>
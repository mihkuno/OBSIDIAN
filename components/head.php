<?php 
// redirect direct url access
defined('_DEFVAR') or header("Location: ../index.php");

session_start();
?>
<!DOCTYPE html>
<head>
	<!-- internet explorer compatibility -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<!-- ICON -->
	<link rel="icon" href="assets/img/icon.ico" type="image/x-icon"/> 

	<!-- TITLE -->
	<title>Obsidian - ICI System</title>
	
	<!-- AUTHOR -->
	<meta name="author" content="Joeninyo Cainday">
	
	<!-- DESCRIPTION -->
	<meta name="description" content="An Iligan Computer Institute Project Management System">
	
	<!-- VIEWPORT -->
	<meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />

	<!-- JQUERY -->
	<script src="assets/scripts/jquery_v3.3.1.min.js"></script>
	<script src="assets/scripts/jquery-ui_v1.12.1.min.js"> </script>


	<!-- Fonts and icons -->
	<script src="assets/scripts/webfont.min.js"></script>
	<script>
		WebFont.load({
			google: {"families":["Lato:300,400,700,900"]},
			custom: {"families":["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands", "simple-line-icons"], urls: ['assets/css/fonts.min.css']},
			active: function() {
				sessionStorage.fonts = true;
			}
		});
	</script>

	<!-- Stylesheets -->
	<link rel="stylesheet" href="assets/fonts/ubuntu.css">
	<link rel="stylesheet" href="assets/styles/datepicker.css" />
	<link rel="stylesheet" href="assets/styles/select.min.css">
	<link rel="stylesheet" href="assets/styles/bootstrap.min.css">
	<link rel="stylesheet" href="assets/styles/atlantis.min.css">
	<link rel='stylesheet' href='assets/styles/calendar.css' />
	<link rel="stylesheet" href="assets/styles/styles.css">
</head>
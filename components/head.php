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

	<!-- LOCAL: Fonts and icons -->
	<script src="assets/js/plugin/webfont/webfont.min.js"></script>
	<script>
		WebFont.load({
			google: {"families":["Lato:300,400,700,900"]},
			custom: {"families":["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands", "simple-line-icons"], urls: ['assets/css/fonts.min.css']},
			active: function() {
				sessionStorage.fonts = true;
			}
		});
	</script>

	<!-- TEMPORARY BROWSER TIMELINE BUTTON FONT FIX -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
	<!-- END TEMPORARY -->

	<!-- WEB: Date Range Picker -->
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

	<!-- WEB: Bootstrap Select -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">

	<!-- LOCAL: BOOSTRAP MINIMUM -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	
	<!-- LOCAL: ATLANTIS THEME -->
	<link rel="stylesheet" href="assets/css/atlantis.min.css">

	<!-- WEB: CALENDAR -->
	<link rel='stylesheet' href='https://fullcalendar.io/js/fullcalendar-3.1.0/fullcalendar.css' />

	<!-- CUSTOM STYLES -->
	<link rel="stylesheet" href="components/styles.css">
</head>
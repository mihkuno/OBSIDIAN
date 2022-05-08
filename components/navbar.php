<?php 
// url direct access isn't permitted
defined('_DEFVAR') or header("Location: ../index.php");
?>

<div class="page-header">
    <!-- PAGE TITLE -->
    <h4 class="page-title"><?php echo ucfirst($_SESSION['active']) ?></h4>
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
            <a href="#"><?php echo ucfirst($_SESSION['active']) ?></a>
        </li>
    </ul>
</div>
<?php 
// url direct access isn't permitted
defined('_DEFVAR') or header("Location: ../index.php");
?>

<div class="main-header">
    <!-- Logo Header -->
    <div class="logo-header" data-background-color="dark2">
        
        <a href="index.php" class="logo">
            <img src="assets/img/logo.svg" alt="navbar brand" class="navbar-brand">
        </a>
        <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
                <i class="icon-menu"></i>
            </span>
        </button>
        <button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
        <div class="nav-toggle">
            <button class="btn btn-toggle toggle-sidebar"><i class="icon-menu"></i></button>
        </div>
    </div>
    <!-- End Logo Header -->

    <!-- Navbar Header -->
    <nav class="navbar navbar-header navbar-expand-lg" data-background-color="dark">
        <div class="container-fluid">
            <!-- Search Navigation -->
            <div class="collapse" id="search-nav">
                <form class="navbar-left navbar-form nav-search mr-md-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button type="submit" class="btn btn-search pr-1">
                                <i class="fa fa-search search-icon"></i>
                            </button>
                        </div>
                        <input type="text" placeholder="Search ..." class="form-control">
                    </div>
                </form>
            </div>
            <!-- Navbar Buttons -->
            <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
                <!-- Notifications -->
                <li class="nav-item toggle-nav-search hidden-caret">
                    <a class="nav-link" data-toggle="collapse" href="#search-nav" role="button" aria-expanded="false" aria-controls="search-nav">
                        <i class="fa fa-search"></i>
                    </a>
                </li>
                <li class="nav-item dropdown hidden-caret">
                    <a class="nav-link dropdown-toggle" href="#" id="notifDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-bell"></i>
                        <span class="notification">4</span>
                    </a>
                    <ul class="dropdown-menu notif-box animated fadeIn" aria-labelledby="notifDropdown">
                        <li>
                            <div class="dropdown-title">You have 4 new notification</div>
                        </li>
                        <li>
                            <div class="scroll-wrapper notif-scroll scrollbar-outer" style="position: relative;"><div class="notif-scroll scrollbar-outer scroll-content" style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 0px;">
                                <div class="notif-center">
                                    <a href="#">
                                        <div class="notif-icon notif-primary"> <i class="fa fa-user-plus"></i> </div>
                                        <div class="notif-content">
                                            <span class="block">
                                                New user registered
                                            </span>
                                            <span class="time">5 minutes ago</span> 
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div class="notif-icon notif-success"> <i class="fa fa-comment"></i> </div>
                                        <div class="notif-content">
                                            <span class="block">
                                                Rahmad commented on Admin
                                            </span>
                                            <span class="time">12 minutes ago</span> 
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div class="notif-img"> 
                                            <img src="assets/img/profile2.jpg" alt="Img Profile">
                                        </div>
                                        <div class="notif-content">
                                            <span class="block">
                                                Reza send messages to you
                                            </span>
                                            <span class="time">12 minutes ago</span> 
                                        </div>
                                    </a>
                                    <a href="#">
                                        <div class="notif-icon notif-danger"> <i class="fa fa-heart"></i> </div>
                                        <div class="notif-content">
                                            <span class="block">
                                                Farrah liked Admin
                                            </span>
                                            <span class="time">17 minutes ago</span> 
                                        </div>
                                    </a>
                                </div>
                            </div><div class="scroll-element scroll-x"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar ui-draggable ui-draggable-handle"></div></div></div><div class="scroll-element scroll-y"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar ui-draggable ui-draggable-handle"></div></div></div></div>
                        </li>
                        <li>
                            <a class="see-all" href="javascript:void(0);">See all notifications<i class="fa fa-angle-right"></i> </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    <!-- End Navbar -->
</div>
<!-- Sidebar -->
<div class="sidebar sidebar-style-2" data-background-color="dark2">
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
        <div class="sidebar-content">
            <div class="user">
                <div class="avatar-sm float-left mr-2">
                    <?php echo '<img src="'.$_SESSION['profile'].'" class="avatar-img rounded-circle">';?>
                </div>
                <div class="info">
                    <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                        <span>
                            <?php echo $_SESSION['user'] ?>
                            <span class="user-level">Administrator</span>
                            <span class="caret"></span>
                        </span>
                    </a>
                    <div class="clearfix"></div>
                    <div class="collapse in" id="collapseExample">
                        <ul class="nav">
                            <li>
                                <a href="signin.php">
                                    <span class="link-collapse">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#settings">
                                    <span class="link-collapse">Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="components/logout.php">
                                    <span class="link-collapse text-danger">Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="nav nav-primary">
                <li class="nav-item active">
                    <a href="#dashboard" class="collapsed">
                        <i class="fas fa-th-list"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#charts" class="collapsed">
                        <i class="far fa-chart-bar"></i>
                        <p>Charts</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="calendar.html">
                        <i class="far icon-calendar"></i>
                        <p>Calendar</p>
                    </a>
                </li>
                <li class="nav-section">
                    <span class="sidebar-mini-icon">
                        <i class="fa fa-ellipsis-h"></i>
                    </span>
                    <h4 class="text-section">Projects</h4>
                </li>
                <li class="mx-4 mt-2">
                    <a href="" class="btn btn-primary btn-block">
                        <span class="btn-label mr-2"> <i class="fas fa-pen-square"></i></span>
                        Create Task
                    </a> 
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- End Sidebar -->
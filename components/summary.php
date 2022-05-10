<?php 
// url direct access isn't permitted
defined('_DEFVAR') or header("Location: ../index.php");
?>

<div class="row">
    <div class="col-md-5">
        <div class="card card-profile">           
            
            <div class="card-header" style="min-height: 180px; background-image: url('../assets/img/flat-wallpaper.png')">
                <div class="profile-picture">
                    <div class="avatar avatar-xxl">
                        <img src="<?php echo $_SESSION['profile'] ?>" alt="..." class="avatar-img rounded-circle">
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="user-profile text-center">
                    
                    <div class="name" style="font-size: 32px;"><?php echo $_SESSION['user']?></div>
                    <div class="job h3"><?php echo $_SESSION['email'] ?></div>
                    <div class="desc">

                    <?php 

                    // -- get the user description

                    require 'requests/connect.php';
                    
                    // obsidian database
                    $database = 'OBSIDIAN';
                    $table = 'credentials';  
                    $conn->select_db($database);

                    $user = $_SESSION['user'];

                    // get desc of user
                    $sql = $conn->query("SELECT `desc` FROM `$table` WHERE `user` = '$user'")->fetch_assoc();

                    $desc = $sql['desc'];
          
                    ?>

                    <input 
                        id="userdesc"
                        type="text" 
                        class="form-control input-border-bottom text-center row-label ml-auto mr-auto" 
                        style="border: 0; color: #828282; max-width: 550px;"
                        placeholder="type a cool description here :)"
                        maxlength="100"
                        value="<?php echo $desc ?>">
                        
                    </div>
                    <!-- <div class="social-media"> -->
                        <!-- <a class="btn btn-info btn-twitter btn-sm btn-link" href="#"> 
                            <span class="btn-label just-icon"><i class="flaticon-twitter"></i> </span>
                        </a>
                        <a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#"> 
                            <span class="btn-label just-icon"><i class="flaticon-google-plus"></i> </span> 
                        </a>
                        <a 
                            target="_blank"
                            rel="publisher" 
                            class="btn btn-primary btn-sm btn-link" 
                            "> 
                            <span class="btn-label just-icon"><i class="flaticon-facebook"></i></span> 
                        </a> -->
                        <!-- <a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#"> 
                            <span class="btn-label just-icon"><i class="flaticon-dribbble"></i> </span> 
                        </a> -->
                    <!-- </div> -->
                    <div class="view-profile">
                        <a 
                            href="https://www.facebook.com/<?php echo $_SESSION['user']?>"
                            class="btn btn-secondary btn-block"
                            style="max-width: 550px; margin:auto;"
                            target="_blank"
                        >View Facebook Profile</a>
                    </div>
                    
                </div>
            </div>
            <div class="card-footer">
                <div class="row user-stats text-center">
                    <div class="col">
                        <div class="tablecount" id="tcount">
                            <?php 
                            
                            // (user_name) database
                            $dbUser = sprintf("user_%s",$_SESSION['user']);  
                            $conn->select_db($dbUser); 

                            // get the number of tables of user data
                            $tableinfo = $conn->query("SELECT `sort` FROM `information`");

                            $count=0;
                            if (is_array($tableinfo) || is_object($tableinfo)) {
                                foreach($tableinfo as $x) {
                                    foreach($x as $tname) {
                                        $count++;
                                    }
                                }
                            }
                            
                            echo $count;
                            ?>
                        </div>
                        <div class="title">Tables</div>
                    </div>
                    <div class="col">
                        <div class="rowcount" id='rcount'>
                            <?php 
                            // (user_name) database
                            $dbUser = sprintf("user_%s",$_SESSION['user']);  
                            $conn->select_db($dbUser); 

                            // get the number of tables of user data
                            $tableinfo = $conn->query("SELECT `name` FROM `information`");

                            $count = 0;
                            if (is_array($tableinfo) || is_object($tableinfo)) {
                                foreach($tableinfo as $x) {
                                    foreach($x as $tname) {
                                        $rowinfo = $conn->query("SELECT `name` FROM `$tname`");
                                        foreach($rowinfo as $y) {
                                            foreach($y as $rname) {
                                                $count++;
                                            }
                                        }
                                    }
                                }
                            }
                            echo $count;
                            ?>
                        </div>
                        <div class="title">Rows</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="col-md-7">
            <div class="card">
                <div class="card-header">
                <div class="card-head-row">
                    <div class="card-title">User Statistics</div>
                    <div class="card-tools">
                        <a onclick="exportCanvas()" class="btn btn-info btn-border btn-round btn-sm mr-2">
                            <span class="btn-label">
                                <i class="fa fa-pencil"></i>
                            </span>
                            Export
                        </a>
                        <a href="#" onclick="printCanvas()" class="btn btn-info btn-border btn-round btn-sm">
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
                    <canvas id="statusDoughnut" width="983" height="375" style="display: block; width: 983px; height: 375px;" class="chartjs-render-monitor"></canvas>
                </div>
                <div id="myChartLegend">
                    <ul class="0-legend html-legend">
                        <li>
                            <span style="background-color:#6861CE"></span>
                            Soon
                        </li>
                        
                        <li>
                            <span style="background-color:#F25961"></span>
                            Stuck
                        </li>
                        <li>
                            <span style="background-color:#FFAD46"></span>
                            Develop
                        </li>
                        <li>
                            <span style="background-color:#31CE36"></span>
                            Complete
                        </li>
                    </ul>
                </div>
            </div>

            <script src="assets/scripts/chart.min.js"></script>
            <script>
            const ctx = document.getElementById('statusDoughnut').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            function exportCanvas() {
                const canvas = document.getElementById('statusDoughnut');
                const dataURL = canvas.toDataURL();
                const image = new Image();
                image.src = dataURL;            

                const w = window.open('');
                w.document.write(image.outerHTML);
            }

            function printCanvas() {  
                var dataUrl = document.getElementById('statusDoughnut').toDataURL(); //attempt to save base64 string to server using this var  
                var windowContent = '<!DOCTYPE html>';
                windowContent += '<html>'
                windowContent += '<head><title>Print canvas</title></head>';
                windowContent += '<body>'
                windowContent += '<img src="' + dataUrl + '">';
                windowContent += '</body>';
                windowContent += '</html>';
                var printWin = window.open('','','width=340,height=260');
                printWin.document.open();
                printWin.document.write(windowContent);
                printWin.document.close();
                printWin.focus();
                printWin.print();
                printWin.close();
            }
            </script>

        </div>
    </div>
</div>
<?php 
// url direct access isn't permitted
defined('_DEFVAR') or header("Location: ../index.php");
?>

<div class="row">
    <div class="col-md-12">
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
    <!-- <div class="col-md-4">
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
    </div> -->
</div>
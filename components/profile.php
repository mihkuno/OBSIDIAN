<?php 
// url direct access isn't permitted
defined('_DEFVAR') or header("Location: ../index.php");
?>

<div class="row">
    <div class="col-md-12">
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
                    <div id="loader-profile" class="card-body is-loading"></div>
                        <input 
                            id="userdesc"
                            type="text" 
                            class="form-control input-border-bottom text-center row-label ml-auto mr-auto d-none" 
                            style="border: 0; color: #828282; max-width: 550px;"
                            placeholder="type a cool description here :)"
                            maxlength="100">
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
                        <div class="number">125</div>
                        <div class="title">Tables</div>
                    </div>
                    <div class="col">
                        <div class="number">25K</div>
                        <div class="title">Rows</div>
                    </div>
                    <div class="col">
                        <div class="number">134</div>
                        <div class="title">Owners</div>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
</div>
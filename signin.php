<?php include 'components/head.php'?>
<body class="bg-dark d-flex align-items-center">

<div class="container">
<div class="row justify-content-center">
	<aside class="col-xl-5">
        <div class="card bg-dark2 p-4">
        <article class="card-body">
            <a href="" class="float-right btn btn-outline-secondary btn-round">Sign up</a>
            <h2 class="card-title mb-4 mt-1" style="font-size: 22px; color: whitesmoke">Sign in to Facebook</h2>
        
            <hr>
            <!-- <p class="text-success text-center">Some message goes here</p> -->

            <form>
                <div class="form-group form-floating-label">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                        </div>
                        <input name="" class="form-control" placeholder="Email or login" type="email">
                    </div> <!-- input-group.// -->
                    </div> <!-- form-group// -->
               

                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                        </div>
                        <input class="form-control" placeholder="******" type="password">
                    </div> <!-- input-group.// -->
                </div> <!-- form-group// -->


                <div class="form-group"> 
                    <div class="checkbox">
                    <label> <input type="checkbox"> Save password </label>
                    </div> <!-- checkbox .// -->
                </div> <!-- form-group// -->  
              
            
                <div class="form-group">
                    <p><a href="" class="btn btn-block btn-secondary"> 
                        <i class="fab fa-facebook-f"></i>   
                        Login
                    </a></p>
                </div> <!-- form-group //-->


                <p class="text-center"><a href="#" class="btn">Forgot password?</a></p>
            
            
            </form>
        </article>
	</aside> <!-- col.// -->
</div> <!-- card.// -->

</div> 
<!--container end.//-->
</body>

<?php include 'components/scripts.php'?>
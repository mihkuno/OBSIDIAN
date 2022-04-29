<?php include 'components/head.php'?>
<body class="bg-dark d-flex align-items-center">

<div class="container">
<div class="row justify-content-center">
    <aside class="col-xl-5">
        <div class="card bg-dark2 p-4">
            <article class="card-body">
                
                <!-- Sign Up Button -->
                <a href="" class="float-right btn btn-outline-secondary btn-round">
                    Sign up</a>
                
                <!-- Form Header -->
                <h2 class="card-title mb-4 mt-1" style="font-size: 22px; color: whitesmoke">
                    Sign in to Facebook</h2>
                <hr>

                 <!-- Form Validation -->
                <?php
                // validate if a form was sent
                if (isset($_GET['submit'])) {
                    // get input values
                    $user = test_input($_GET["user"]);
                    $passw = test_input($_GET["passw"]);
                
                    // check database for existing user
                    if ($user == 'root' && $passw == '') {        
                        // <!-- Success Message -->
                        echo '<h5 class="text-success text-center">Login Successful</h5>';
                    }
                    else {
                        // <!-- Failed Message -->
                        echo '<h5 class="text-danger text-center">Account not registered!</h5>';
                    }
                }

                function test_input($data) {
                    $data = trim($data);
                    $data = stripslashes($data);
                    $data = htmlspecialchars($data);
                    return $data;
                }
                ?>

                <!-- Form Container -->
                <form 
                    action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" 
                    method="GET">
 
                    <!-- Username -->
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> 
                                    <i class="fa fa-user"></i> 
                                </span>
                            </div>
                            <input 
                                class="form-control" 
                                placeholder="Your Username"       
                                name="user"  
                                type="text">
                        </div> <!-- input-group.// -->
                    </div> <!-- form-group// -->
                
                    <!-- Password -->
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> 
                                    <i class="fa fa-lock"></i> 
                                </span>
                            </div>
                            <input 
                                class="form-control" 
                                placeholder="******" 
                                name="passw"
                                type="password">
                        </div> <!-- input-group.// -->
                    </div> <!-- form-group// -->

                    <!-- Save Password -->
                    <div class="form-group"> 
                        <div class="checkbox">
                            <label> 
                                <input type="checkbox"> 
                                    Remember me 
                            </label>
                        </div> <!-- checkbox .// -->
                    </div> <!-- form-group// -->  
                
                    <!-- Submit Button -->
                    <div class="form-group">
                        <button 
                            type="submit" 
                            name="submit" 
                            class="btn btn-block btn-secondary"> 
                            <i class="fab fa-facebook-f"></i>   
                            Login
                        </button>
                    </div> <!-- form-group //-->

                        <!-- Forgot Button -->
                    <p class="text-center"><a href="#" class="btn">Forgot password?</a></p>
                
                </form>
            </article>
        </div>
    </aside> <!-- col.// -->
</div> <!-- card.// -->
</div> 
<!--container end.//-->
</body>
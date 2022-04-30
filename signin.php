<?php include 'components/head.php'?>
<body class="bg-dark d-flex align-items-center">

<div class="container">
<div class="row justify-content-center">
    <aside class="col-xl-5">
        <div class="card bg-dark2 p-4">
            <article class="card-body">
                
                <!-- Sign Up Button -->
                <a href="signup.php" class="float-right btn btn-outline-secondary btn-round">
                    Sign up</a>
                
                <!-- Logo Header -->
                <img src="assets/img/logo.svg" alt="navbar brand" class="navbar-brand">
                
                <!-- Header Text -->
                <h2 class="text-muted text-center mt-4">Sign in to Facebook</h2>
                <h5 class="text-muted text-center">you can also log in with a local account instead</h5>
                <hr>

                 <!-- Form Validation -->
                <?php
                // validate if a form was sent
                if (isset($_GET['submit'])) {
                    // get input values
                    $user = $passw = false;

                    // define variables and set to empty values
                    if ($_SERVER["REQUEST_METHOD"] == "GET") {
                        // check if both input fields are empty
                        if (empty($_GET["user"]) && empty($_GET["passw"])) {
                            echo "<h5 class='text-danger text-center'>fill out the form first</h5>";
                        } 
                        // check if user is empty
                        else if (empty($_GET["user"])) {
                            echo "<h5 class='text-danger text-center'>*user field is empty*</h5>";
                        } 
                        // check if password is empty
                        else if ((empty($_GET["passw"]))) {
                            echo "<h5 class='text-danger text-center'>*password field is empty*</h5>";
                        } 
                        // otherwise, both is filled
                        else {
                            $user = test_input($_GET["user"]);
                            $passw = test_input($_GET["passw"]);
                            
                            // connect and select the database
                            require 'dbconnect.php';

                            // check for existing user
                            $sql = "
                            SELECT user, email FROM `CREDENTIALS` 
                            WHERE user='$user' OR email='$user';
                            ";

                            // <!-- check if user account exists -->
                            if ($conn->query($sql)->num_rows > 0) {
                                // check if user and password is same
                                $sql = "
                                SELECT user, email FROM `CREDENTIALS` 
                                WHERE (user='$user' OR email='$user') AND passw='$passw'
                                ";

                                // user and password matches
                                if ($conn->query($sql)->num_rows > 0) { 
                                    echo "<h5 class='text-success text-center'>login successful</h5>";
                                    // redirect to the dashboard
                                    // ...


                                }
                                else { // password is wrong
                                    echo "<h5 class='text-danger text-center'>incorrect password</h5>";
                                }
                            }
                            // <!-- account doesn't exist -->
                            else {
                                echo "<h5 class='text-danger text-center'>account is not registered</h5>";
                            }

                            // close mysql connection
                            $conn->close(); // imported from dbconnect
                        }
                    }
                }
                // cleans input values
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
 
                    <!-- User -->
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> 
                                    <i class="fa fa-user"></i> 
                                </span>
                            </div>
                            <input 
                                class="form-control" 
                                placeholder="Username or Email"       
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
                    <p class="text-center">
                        <a href="#" class="btn">Forgot password?</a></p>
                
                </form>
            </article>
        </div>
    </aside> <!-- col.// -->
</div> <!-- card.// -->
</div> 
<!--container end.//-->
</body>
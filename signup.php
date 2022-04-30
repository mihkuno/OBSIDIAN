<?php include 'components/head.php'?>

<style>
/* PROFILE */
input[type="file"] {
    display: none;
}
.placeholder {
    border: 1px solid #ccc;
    display: inline-block;
    cursor: pointer;
}
.placeholder:hover {
    opacity: 0.8;
}
</style>
<body class="bg-dark d-flex align-items-center">
<div class="container">
<div class="row justify-content-center">
    
    <aside class="col-xl-5">
        <div class="card bg-dark2 p-4">  
            <article class="card-body">
                
                    
                <!-- Sign In Button -->
                <a href="signin.php" class="float-right btn btn-outline-secondary btn-round">
                    Sign In</a>
        
                <!-- Logo Header -->
                <img src="assets/img/logo.svg" alt="navbar brand" class="navbar-brand">

                <!-- Header Text -->
                <h2 class="text-muted text-center mt-4">Create a local account</h2>
                <h5 class="text-muted text-center">access more features using a facebook account</h5>
                <hr>

                 <!-- Form Validation -->
                <?php
                // validate if a form was sent
                if (isset($_GET['submit'])) {
                    // get input values
                    $user = $email = $passw = '';

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
                        // check if email is empty
                        else if (empty($_GET["email"])) {
                            echo "<h5 class='text-danger text-center'>*email field is empty*</h5>";
                        } 
                        // check if email is correct
                        else if (!filter_var(test_input($_GET["email"]), FILTER_VALIDATE_EMAIL)) {
                            echo "<h5 class='text-danger text-center'>*invalid email format*</h5>";
                        }
                        // check if password is empty
                        else if ((empty($_GET["passw"]))) {
                            echo "<h5 class='text-danger text-center'>*password field is empty*</h5>";
                        } 
                        // otherwise, both is filled
                        else {
                            $user = test_input($_GET["user"]);
                            $email = test_input($_GET["email"]);
                            $passw = test_input($_GET["passw"]);
        
                            // connect and select the database
                            require 'dbconnect.php';

                            // sql queries to check for existing account
                            $checkBoth  = "SELECT user, email FROM `CREDENTIALS` WHERE user='$user' AND email='email'";
                            $checkUser  = "SELECT user        FROM `CREDENTIALS` WHERE user='$user'";
                            $checkEmail = "SELECT email       FROM `CREDENTIALS` WHERE email='$email'";

                            // <!-- check if user account exists -->
                            if ($conn->query($checkBoth)->num_rows > 0) {
                                echo "<h5 class='text-danger text-center'>
                                    this user account already exists, forgot password?</h5>";
                            }
                            // <!-- check if username exists -->
                            else if ($conn->query($checkUser)->num_rows > 0) {
                                echo "<h5 class='text-danger text-center'>
                                    this username already exists</h5>";
                            }
                            // <!-- check if email exists -->
                            else if ($conn->query($checkEmail)->num_rows > 0) {
                                echo "<h5 class='text-danger text-center'>
                                    this email already exists</h5>";
                            }
                            // <!-- account doesn't exist, create the account -->
                            else {
                                // query insert the values
                                $sql = "
                                INSERT INTO CREDENTIALS (user, email, passw, profile)   
                                VALUES ('$user', '$email', '$passw', profile) ";

                                // send the query to database
                                if ($conn -> query($sql) === TRUE) {
                                    echo "<h5 class='text-success text-center'>
                                        account created successfully</h5>";
                                }   
                                else { // if the account was not inserted
                                    echo "<h5 class='text-danger text-center'>
                                        an error occured, account was not created</h5>";
                                }
                            }
                            // redirect to the dashboard
                            // ...

                            
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
                <form autocomplete="off"
                    action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" 
                    method="GET">

                    <!-- Profile -->
                    <div 
                        class="avatar avatar-xxl d-block mx-auto mt-4" 
                        style="z-index: 1;">

                        <label 
                            class="placeholder"
                            style="
                                background: none; 
                                border: 1px solid transparent; ">
                            <input 
                                name="photo"
                                type="file"
                                accept="image/*"
                                onchange="document.getElementById('profile').src = window.URL.createObjectURL(this.files[0])"/>
                            <img 
                                id="profile"
                                style="min-width: 130px; min-height: 130px"
                                src="assets/img/placeholder.png" 
                                class="avatar-img rounded-circle">
                        </label>
                    </div>
               
                    <!-- Username -->
                    <div class="form-group">
                        <label>Username</label>
                        <input 
                            class="form-control" 
                            placeholder="eg. krakerz" 
                            name="user"
                            type="text">
                    </div> <!-- form-group// -->
                
                    <!-- Email -->
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            class="form-control" 
                            placeholder="user@gmail.com" 
                            name="email"
                            type="text">
                    </div> <!-- form-group// -->

                    <!-- Password -->
                    <div class="form-group">
                        <label>Password</label>
                        <input 
                            class="form-control" 
                            placeholder="******" 
                            name="passw"
                            type="password">
                    </div> <!-- form-group// -->
                    <br>
                    <!-- Submit Button -->
                    <div class="form-group">
                        <button 
                            type="submit" 
                            name="submit" 
                            class="btn btn-block btn-secondary"> 
                            Register
                        </button>
                    </div> <!-- form-group //-->
                </form>
            </article>
        </div>
    </aside> <!-- col.// -->
</div> <!-- card.// -->
</div> 
<!--container end.//-->
</body>
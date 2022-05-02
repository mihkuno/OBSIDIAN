<?php 
// base page (allow url direct access):
define('_DEFVAR', 1);

include 'components/head.php';
// a user is already logged in
if(isset($_SESSION['user'], $_SESSION['passw'], $_SESSION['profile']) 
){
    // bring them back to the dashboard 
    header("Location: index.php");
    die("Redirecting to: index.php"); 
}
?>

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
                    if (isset($_POST['submit'])) {
                        // validate the inputs first
                        if ($_SERVER["REQUEST_METHOD"] == "POST") {

                            // connect and select the database
                            include 'components/dbconnect.php';

                            // initial profile picture variables
                            $is_image = $past_limit = false;
                            $filename = $tmpname = $imgsize = $imgtype = $profile = '';

                            // is an optional profile picture added?
                            if (isset($_FILES['profile'])) {
                                // associate image file variables
                                $filename    = $_FILES['profile']['name'];
                                $tmpname     = $_FILES['profile']['tmp_name'];
                                $imgsize     = $_FILES['profile']['size'];
                                $imgtype     = $_FILES['profile']['type'];

                                // [INSTRCTION: PNG AND JPEG ONLY] 
                                if ($imgtype == 'image/png' || $imgtype== 'image/jpeg') {
                                    $is_image = true;        // correct image        
                                } else {$is_image = false; } // not an image

                                // [INSTRUCTION: ONLY 10MB FILE SIZE LIMIT] 
                                if ($imgsize <= 10000000) { 
                                    $past_limit = false;     // decent size
                                } else {$past_limit = true; } // too large
                            } 
                            
                            // there's a picture in cache and its type image
                            if ($is_image == false && isset($_FILES['profile']) == false) {
                                echo "<h5 class='text-danger text-center'>
                                *please select an image*</h5>";
                            }
                            // the file image is more than 10mb
                            else if ($past_limit == true && isset($_FILES['profile']) == false) {
                                echo "<h5 class='text-danger text-center'>
                                *file image too large*</h5>";
                            }
                            // check if all input fields are empty
                            else if (
                                    empty($_POST["user"])  && 
                                    empty($_POST["email"]) && 
                                    empty($_POST["passw"])) 
                            {
                                echo "<h5 class='text-danger text-center'>
                                fill out the form first</h5>";
                            } 
                            // check if user is empty
                            else if (empty($_POST["user"])) {
                                echo "<h5 class='text-danger text-center'>
                                *user field is empty*</h5>";
                            } 
                            // check if email is empty
                            else if (empty($_POST["email"])) {
                                echo "<h5 class='text-danger text-center'>
                                *email field is empty*</h5>";
                            } 
                            // check if email is correct
                            else if (
                                !filter_var(test_input($_POST["email"]), 
                                FILTER_VALIDATE_EMAIL)) 
                            {
                                echo "<h5 class='text-danger text-center'>
                                *invalid email format*</h5>";
                            }
                            // check if password is empty
                            else if ((empty($_POST["passw"]))) {
                                echo "<h5 class='text-danger text-center'>
                                *password field is empty*</h5>";
                            } 
                            // check if user, email or password is greater than 40
                            else if (
                                strlen($_POST['user'])  > 40 ||
                                strlen($_POST['email']) > 40 ||
                                strlen($_POST['passw']) > 40
                            ) {
                                echo "<h5 class='text-danger text-center'>
                                *input limit is 40 characters*</h5>"; 
                            }
                            // otherwise, input data is decent
                            else { // check for existing accounts

                                // capture form input values
                                $user    = test_input($_POST["user"]);
                                $email   = test_input($_POST["email"]);
                                $passw   = test_input($_POST["passw"]);
                                $profile = ' '; // to be validated

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
                                    // create a connection without database
                                    $userdb = new mysqli($dbServername, $dbUsername, $dbPassword);
                                    // create the user's CRUD database
                                    $sql = "CREATE DATABASE `user_$user`";
                                    // send the query to create database
                                    if ($userdb -> query($sql) === TRUE) { // check user's db creation
                                        if ($is_image && !$past_limit) { // validated profile image
                                            // get the extension of the image
                                            $ext = pathinfo($filename, PATHINFO_EXTENSION);
                                            // rename the image to its username
                                            $image = $user.'.'.$ext;
                                            // append the image to its path
                                            $profile = "images/profiles/".$image;
                                            // move uploaded temp image to the server storage (overwrites existing files)
                                            $e = move_uploaded_file($tmpname, $profile); 
                                            // display alert if image failed to upload
                                            if (!$e) { echo '<script>alert("failed uploading profile");</script>';}
                                            // insert query values to mysql with profile
                                            $sql = "
                                            INSERT INTO CREDENTIALS (user, email, passw, profile)   
                                            VALUES ('$user', '$email', '$passw', '$profile') ";
                                        }
                                        else {
                                            // insert query values to mysql without profile
                                            $sql = "
                                            INSERT INTO CREDENTIALS (user, email, passw)   
                                            VALUES ('$user', '$email', '$passw') ";
                                        }           
                                        // send the query to database
                                        if ($conn -> query($sql) === TRUE) {
    
                                            // get the username if email was input
                                            $sql = "SELECT user FROM CREDENTIALS 
                                            WHERE email='$user' 
                                            OR user='$user';";
                                            // get query result as an array
                                            $row = $conn->query($sql)->fetch_assoc();
                                            // get the username on the first row 
                                            $user = $row['user'];
    
                                            // get the profile path of user
                                            $sql = "SELECT profile FROM CREDENTIALS 
                                                    WHERE user='$user';";
                                            // get query result as an array
                                            $row = $conn->query($sql)->fetch_assoc();
                                            // get the profile path on the first row 
                                            $profile = ($row['profile'] == NULL)? 
                                                'assets/img/placeholder.png' : $row['profile'];
    
                                            // initialize the session and profile
                                            $_SESSION['user']    = $user;
                                            $_SESSION['passw']   = $passw;
                                            $_SESSION['profile'] = $profile;
                                            
                                            // show account created message
                                            echo "<h5 class='text-success text-center'>
                                            account created!</h5>";
                                            
                                            // wait 1.0s then redirect to dashboard
                                            echo " 
                                            <script>
                                                setTimeout(function(){
                                                    window.location.href = 'index.php';
                                                }, 1000);
                                            </script>";
    
                                        }   
                                        else { // if the account was not inserted
                                            echo "<h5 class='text-danger text-center'>
                                            an error occured, account was not created</h5>";
                                        }
                                    }
                                    else {
                                        echo "<h5 class='text-danger text-center'>
                                        creating the user database failed</h5>";
                                    }
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
                <form autocomplete="off"
                    action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" 
                    enctype="multipart/form-data"
                    method="POST">

                    <!-- Profile -->
                    <div 
                        class="avatar avatar-xxl d-block mx-auto mt-4" 
                        style="z-index: 1;">

                        <label 
                            class="profile-container"
                            style="
                                background: none; 
                                border: 1px solid transparent; ">
                            <input
                                id="profile-input" 
                                name="profile"
                                type="file"
                                accept="image/*"/>
                            <img 
                                id="profile-image"
                                src="assets/img/placeholder.png" 
                                class="avatar-img rounded-circle">
                                <script>
                                document.getElementById('profile-input')
                                    .addEventListener('change', 
                                    (e) => {
                                    // reset to placeholder if no image selected
                                    if (e.target.files[0] == null) {
                                        document.getElementById('profile-image').src = "assets/img/placeholder.png";
                                    }
                                    // otherwise, change placeholder to image selected
                                    else {
                                        document.getElementById('profile-image').src = window.URL.createObjectURL(e.target.files[0]);
                                        console.log(e.target.files[0]);
                                    }
                                });
                            </script>
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
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
                    $user = test_input($_GET["user"]);
                    $passw = test_input($_GET["passw"]);
                
                    // // check database for existing user
                    // if ($user == 'root' && $passw == '') {        
                    //     // <!-- Success Message -->
                    //     echo '<h5 class="text-success text-center">Login Successful</h5>';
                    // }
                    // else {
                    //     // <!-- Failed Message -->
                    //     echo '<h5 class="text-danger text-center">Account not registered!</h5>';
                    // }

                    $sql = "
                        
                    ";





                    // Insert values
                    // $sql = "
                    // INSERT INTO CREDENTIALS 
                    //     (user, email, passw, profile) 
                    // VALUES 
                    //     ('msadfoz', 'csadfai@gSADFail.com', 'passw', '/image/hiho')
                    // ";

                    // if ($conn -> query($sql) === TRUE) {
                    //     echo "Values to 'CREDENTIALS' inserted successfully<br><br>";
                    // }   else {
                    //     echo "Could not insert values to 'CREDENTIALS': " . $conn -> error .'<br><br>';
                    // }
                           
                }

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
                                src="assets/img/placeholder.jpg" 
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
                            type="email">
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
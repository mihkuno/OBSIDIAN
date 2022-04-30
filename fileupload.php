<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <title>File Upload</title>
</head>
<body>


<!-- CARD: IMAGE FILE INPUT  -->
<div class="card" id="image">
    <!-- IMAGE RENDER -->
    <?php

    // initialize file information variables
    $filename = $tmpname = $imgsize = $destination = '';

    // initialize to check data 
    $can_upload = false; // file criteria is correct
    $not_image = false; // it is a png or jpeg image
    $not_limit = false; // it is a decent file size

    // a submit has been pressed
    if (isset($_POST["submit"])) {
        
        // associate file information to variables
        $filename = $_FILES['pic']['name'];
        $tmpname = $_FILES['pic']['tmp_name'];
        $imgsize= $_FILES['pic']['size'];
        $imgtype= $_FILES['pic']['type'];
        $destination = "images/".$filename;
        
        // [INSTRUCTION: ONLY 10MB FILE SIZE LIMIT] 
        // SERVER WILL SHOW A LINE 0 WARNING IF EXCEEDED PHP.INI CONFIG LIMIT
        if ($imgsize <= 10000000) { // check if loaded file size is less than 10mb (in bytes) 
            // [INSTRCTION: PNG AND JPEG ONLY] 
            if ($imgtype == 'image/png' || $imgtype== 'image/jpeg') { // check if image is available 
                // move uploaded temp image to the server storage (overwrites existing files)
                $e = move_uploaded_file($tmpname, $destination); 
                if ($e) { echo 'FILE SUCCESSFULLY TRANSFERED'; }
                else  { echo 'FILE NOT UPLOADED'; }
                // echo $destination; // show file location

                // [INSTRUCTION: DISPLAY THE IMAGE AFTER UPLOAD]
                echo '<img src="'.$destination.'" alt="Avatar" style="width:100%">'; // display image
                $can_upload = true; // show image information
            }
            else {
                $not_image = true; // file is not an image
                echo '<img src="images/placeholder.gif" alt="Avatar" style="width:100%">'; // display gif placeholder if no image
            }
        }
        else {
            $not_limit = true; // image is too large
            echo '<img src="images/placeholder.gif" alt="Avatar" style="width:100%">'; // display gif placeholder if no image
        }
    }  
    else { // only shows on first load
        echo '<img src="images/placeholder.gif" alt="Avatar" style="width:100%">';
    }
    ?>
    <!-- IMAGE INPUT FORM -->
    <div class="container">
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" enctype="multipart/form-data">
            <input type="file" name="pic" id="pic">
            <input type="submit" value="UPLOAD" name="submit">
            <!-- [INSTRUCTION: RESET BUTTON] -->
            <input type="reset" value="RESET" name="reset">
        </form>
    </div>
</div>

<!-- CARD: CONSOLE  -->
<div class="card" id="console">
    <?php 
        // show all the files on server folder
        echo '<pre>IMAGE_UPLOADED => '; print_r(scandir('images/')); echo '</pre>';
        echo '<hr>'; // line to seperate image_uploaded and image_information 

        // [INSTRUCTION: SHOW ERROR MESSAGES]
        if (isset($_POST["submit"])) { // submit button was clicked
            if ($can_upload) { 
                // show filtered $_FILES information 
                echo '<pre>IMAGE_LOADED => '; print_r($_FILES); echo '</pre>';
            }
            else if ($filename == '') { 
                // sent an empty file
                echo '<pre>LOG => nothing to read..</pre>';
            }
            else if ($not_limit) { 
                // image size is above limit
                echo '<pre>LOG => the file size is too large: "'.number_format($imgsize).' bytes > '.number_format(10000000).' bytes"..</pre>';
            }
            else if ($not_image) { 
                // file type is not image
                echo '<pre>LOG => the file '.$filename.' is not an image..</pre>';
            }
        }
        else { 
            // only shows on first load
            echo "<code>LOG => null..</code>";
        }
    ?>
    <div class="container">
        <h3>Console</h3>
    </div>
</div>
</body>
</html>
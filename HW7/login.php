#!/usr/local/bin/php 
<?php
    session_save_path(__DIR__. '/sessions/');
    session_name('myWebpage');
    session_start();

    $_SESSION['loggedin'] = false;
    $incorr_submission = false;

    if (isset($_POST['passwordSubmitted'])){
        validatePass($_POST['passwordSubmitted'], $incorr_submission);
    };

    function validatePass($submiss, &$incorr_submission){
        $file = fopen('h_password.txt', 'r') or die('Unable to find the hashed password.');
        
        $hashed_password = fgets($file);
        $hashed_password = trim($hashed_password);
        $hashed_submiss = hash('md2', $submiss);

        if($hashed_password !== $hashed_submiss){
            $_SESSION['loggedin'] = false;
            $incorr_submission = true;
        }
        else{
          $username = $_POST['usernameBoxID'];
          if($username !== $_COOKIE['username']){// username does not pass
            $_SESSION['loggedin'] = false;
            $incorr_submission = false;
          } 
          else{ // username passed
            $_SESSION['loggedin'] = true;
            header('Location: index.php');
            exit;
          }
        }
        fclose($file);
    }
?>
<!DOCTYPE html>

<html lang = "en"> 
  <head> 
    <meta charset="utf-8"> 
    <title> Login </title>
        <script src = "username.js" defer></script> 
        <script src = "login.js" defer></script> 
    <!-- to view javascript in browser, use ctrl + shift + j -->
  </head>
  <body>
    <header>
      <h1> Welcome! Ready to check out my webpage? </h1>
    </header>

    <main>
        <section>
            <h2> Enter a username. </h2>
            <p> So that you can  make your own posts and purchases, select a username and password. </p>
            <fieldset>
                <form method = "POST" action= "<?php echo $_SERVER['PHP_SELF'];?>">
                  <label for = "usernameBoxID">Username: </label>
                  <input type = "text" id="usernameBoxID" name="usernameBoxID">    
                  <br>
                  <label for = "passwordEntry">Password: </label>
                  <input type ="password" id="passwordEntry" name="passwordSubmitted">
                  <input type = "submit" id = "submitButton" value = "Login">
                </form>
            </fieldset>
            <?php 
            if($incorr_submission){
                echo '<p> Invalid password!</p>';
            }
            ?>
        </section>
    </main>

    <footer>
      <hr>
      <small>
        Copyright &copy; 2023 Joanna Liu
      </small>
    </footer>
  </body>
</html>
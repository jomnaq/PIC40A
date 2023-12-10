#!/usr/local/bin/php 
<?php
 session_save_path(__DIR__. '/sessions/');
 session_name('myWebpage');
 session_start();
 if($_SESSION['loggedin'] === false){
    header('Location: login.php');
    exit;
  } 
  if(!isset($_COOKIE['username'])){
    header('Location: login.php');
    exit;
  }

  // making credit.db
  $creditdb = new SQLite3('credit.db');
  $query = "CREATE TABLE IF NOT EXISTS users(username TEXT, credit REAL)";
  $creditdb->exec($query);

  // getting current user
  $currentUser = $_COOKIE['username'];
  $currentCredit = 20; // temporary before checking

  // Prepare and execute the SELECT query
  $checkUserQuery = $creditdb->prepare("SELECT * FROM users WHERE username = :username");
  $checkUserQuery->bindValue(':username', $currentUser, SQLITE3_TEXT);
  $result = $checkUserQuery->execute();

  $row = $result->fetchArray(SQLITE3_ASSOC);

  // If user not found, insert into the database with $20 credit
  if (!$row) {
    $insertUserQuery = $creditdb->prepare("INSERT INTO users (username, credit) VALUES (:username, 20.00)");
    $insertUserQuery->bindValue(':username', $currentUser, SQLITE3_TEXT);
    $insertUserQuery->execute();
  } else {
    // If user found, retrieve the current credit
    $currentCredit = $row['credit'];
  }

  $creditdb->close();
?>
<!DOCTYPE html>

<html lang = "en"> 
  <head> 
    <meta charset="utf-8"> 
    <title> Our Merchandise </title>
    <link rel="stylesheet" href="style.css">
    <script src = "merch.js" defer></script> 
    <!-- to view javascript in browser, use ctrl + shift + j -->
  </head>
  <body>
    <header>
      <h1> Our Merchandise </h1>
    </header>
    <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="login.php">Login</a></li>
                <li><a href="blog.php">Our Posts</a></li>
                <li class = "currentPage">Our Products</li>
            </ul>     
        </nav>

    <main>
      <section>
        <h2> Harmony Photo Prints </h2> <!-- a -->
        <p> <!-- b -->
          Please have a look around. Our new members are awarded with $20.00 in credit.
          You can add credit at anytime with a coupon code. When you want to make
          a purchase, please select the checkboxes of the items you wish to purchase and
          click the "Checkout" button below.
        </p>
        <p class = "sticky"><?php echo $currentCredit;?></p> <!-- c -->
        <table> <!-- d -->
            <tbody>
                <tr>
                    <td> 
                        <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/polaroidprint.png">
                        <h3> Signed Polaroid Print </h3>
                        <input type = "checkbox" id = "check1">
                        <span></span>
                        <p>
                            Limited stock (only one) polaroid print of Harmony with a pom ball around her neck. 
                        </p>
                    </td>
                    <td> 
                        <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/posterprint.png">
                        <h3> Harmony Laying Down Poster </h3>
                        <input type = "checkbox" id = "check1">
                        <span></span>
                        <p>
                            Large poster of Harmony laying down on her side. Perfect wall decoration for Harmony fans!
                        </p>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/hatprints.png">
                        <h3> Harmony Hat Prints </h3>
                        <input type = "checkbox" id = "check1">
                        <span></span>
                        <p>
                            Three standard sized prints, photo finish, of Harmony with her rabbit hat on.
                        </p>
                    </td>
                    <td> 
                        <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/sittingprints.png">
                        <h3> Harmony Simple Polaroids </h3>
                        <input type = "checkbox" id = "check1">
                        <span></span>
                        <p>
                            Three polaroid prints of Harmony sitting on the floor looking angry, curious, and bored.
                        </p>
                    </td>
                </tr>
            </tbody>       
        </table>
        <fieldset class="boxed">
            <label for = "couponID">Coupon code: </label>
            <input type = "text" id = "couponID">
            <br>
            <input type = "button" id = "checkoutButton" value = "Checkout">
            <p class = "checkout" id = "receiptId"></p>
        </fieldset>
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
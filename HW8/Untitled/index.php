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
?>
<!DOCTYPE html>

<html lang = "en"> <!-- This is the opening tag for our first HTML element:: "html" -->
  <head> <!-- head is a 'child' of html, html is the 'parent' of head. -->
    <meta charset="utf-8"> <!-- the opening tag of meta serves as the closing tag -->
    <title> Harmony's Havocs </title>
  </head>

  <!-- Title chunk -->
  <body>
    <header>
      <span id = "greeting"></span>
      <?php
        echo 'Hello, '.$_COOKIE['username'].'!';
      ?>
      <h1>
         My Sister's Cat Harmony 
      </h1>
    </header>

    <main>

      <!-- Introduction -->
      <section>
        <h2> Introduction </h2>
        <p>
          Meet Harmony, my sister's cat! Though adopted only a year ago, she's already wreaked quite the havoc around the house!
        </p>
        <p>
          Find out more about this silly brown tabby and her adventures below!
        </p>
        <figure>
          <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/chaoshar.jpg" width = 200 alt = "Screaming Harmony">
          <figcaption>
            Harmony screaming.
          </figcaption>
        </figure>       
      </section>

      <!-- Fun Facts -->
      <section>
        <h2> Fun Facts </h2>
        <ol>
          <li> Harmony ate my sister's pet hamster. </li>
          <li> A nickname we use for Harmony is "Xiao Har", which in Chinese translates to "small child". </li>
          <li> My sister makes homemade catfood for Harmony. </li>
          <li> Harmony does not cover her poop in the litterbox, so it stinks up the whole room. </li>
        </ol>
      </section>

      <!-- Stories -->
      <section>
        <h2> Silly Harmony Pictures and Stories </h2>
        <h3> Sitting at the Dining Table </h3>
        <p>
          Harmony loves to nose around the house looking for food, and when we're eating dinner, a lot of the 
          times she'll come up next to us, sit on one of the chairs, and look over the edge of the table, sniffing
          eagerly to see if there's anything she can steal away. I once caught a photo of her doing this, and it reminded
          me of a popular meme where a cat is sitting in front of a salad at a table. So, I recreated the meme but with
          a picture of Harmony.
        </p>
          <figure>
            <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/saladhar.jpg" width = 415 alt = "Harmony Salad Meme">
            <figcaption>
              Harmony in the meme.
            </figcaption>
          </figure>
          <figure>
            <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/othersalad.PNG" width = 415 alt = "Comparison Meme">
            <figcaption>
              The original meme.
            </figcaption>
          </figure> 

        <h3> Wearing the Silly Rabbit Hat </h3>
        <p>
          Once, I brought home a rabbit hat to put on Harmony. Even though in these pictures she looks
          pretty calm, she actually hated it. She would wiggle her head desperately trying to get it off, 
          and couldn't keep the hat on for more than a few seconds. Luckily, at least I was able to snatch
          a few photos of her wearing it!
        </p>
          <figure>
            <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/cathat.JPG" width = 200 alt = "Harmony with Hat">
            <img src = "https://www.pic.ucla.edu/~jjliu7/harmonypics/cathat2.JPG" width = 200 alt = "Harmony with Hat2">
          </figure>          
      </section>

      <section>
        <h2> Some recent posts by other users: </h2>
        <p> <b>SuperCoolCat25: </b>Guys my cat refuses to eat cucumbers... Is this normal? </p>
        <p> <b>malicious666: </b> Look at this new <a href="https://www.pic.ucla.edu/~jjliu7/HW3/scarf1.html" target = "_blank" title="cuteScarf.png" rel ="opener">scarf</a> I got for my cat! 
          She's so cute in this <a href="https://www.pic.ucla.edu/~jjliu7/HW3/scarf2.html" target = "_blank" title="scarfedCat.png" rel ="opener">picture</a> especially.</p>
        <p> <b>SussyWussyMeowMeow: </b>My friends and family are concerned about me because I can't stop meowing... Help! </p>
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
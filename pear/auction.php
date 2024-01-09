#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>JP's Auction House</title>

    <!-- To help with caching I'm using php here to inject a random number for a query string. -->
    <!-- You might find this trick helpful in other places too.  -->
    <script src="auction.js?v=<?php echo rand(); ?>" defer></script>
    <link rel="stylesheet" href="auction.css?v=<?php echo rand(); ?>">

  </head>

  <body>
    <header>
      <h1>Item up for Bid</h1>
    </header>

    <main>
      <!-- Part 1 -->
      <section>
        <p id = 'img'></p>
        <h2 id = 'title'></h2>
        <p id = 'price'></p>
        <p id = 'descr'></p>

        <?php
          // Read and format the information from the url
          // https://www.math.ucla.edu/~burnett/info/item.txt
        ?>
        <p id="timer"></p>
      </section>
      <hr> 
      <!-- Part 2 -->
      <section >
        <p id="bid">
        <?php
            $filename = 'bids.txt';
             if(file_exists($filename)){
                echo nl2br(file_get_contents($filename));
             }
        ?>
        </p>
        <fieldset>
        <form id = "postform" method = "POST">
          <div>
          <label for="name">Your Name: </label>
          <input type="text" name="nameSubmitted" id="name">
          </div>
          <br>
          <div>
          <label for="bidmoney">Bid: </label>
          <input type="text" name="bidSubmitted" id="bidmoney">
          </div>
          <br>
          <input id="btn" value="Bid" type = "Submit">
      </form>

        </fieldset>
      </section>
    </main>

    <footer>
      <hr>
      &copy; Johnny Pickles Enterprises, 2023
    </footer>
  </body>
</html>



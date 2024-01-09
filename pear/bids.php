#!/usr/local/bin/php
<?php
header('Content-Type: text/plain; charset = utf-8');
  //post
  if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $valuesAreSet = isset($_POST['nameSubmitted']) && isset($_POST['bidSubmitted']);
    if ($valuesAreSet) {
      $name = $_POST['nameSubmitted'];
      $bidval = $_POST['bidSubmitted'];
    // Compare the submitted bid with the bid stored
    // in the bids.txt file. 
      $file = file_get_contents('bids.txt');
      $oldbids = (float)$file;
      if($oldbids < $bidval) {
        // update
        $data = $name . "<br>". $bidval;
        file_put_contents('bids.txt', $data);
        echo nl2br(file_get_contents('bids.txt'));
      }
    } else { // don't change the file
      echo nl2br(file_get_contents('bids.txt'));
    }
  }
  //get
  else if($_SERVER['REQUEST_METHOD'] === 'GET'){ // from blog.php
    $file = file_get_contents('https://www.math.ucla.edu/~burnett/info/item.txt');
    echo nl2br($file);           
  }
else {
  echo 'Either the name or bid was not posted.';
}
?>

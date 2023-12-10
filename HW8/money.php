#!/usr/local/bin/php 
<?php header('Content-Type: text/plain; charset=utf-8');

// Check if the required data is present in the POST request
if (isset($_POST['username']) && isset($_POST['credit'])) {
    $username = $_POST['username'];
    $credit = $_POST['credit'];
    
    $creditdb = new SQLite3('credit.db');
    $statement = $creditdb->prepare("UPDATE users SET credit = ". $credit . " WHERE username = '". $username ."'");
    $statement->execute();

    $creditdb->close();
    echo $credit;
} else {
    echo "Either the user or the credit was not posted.";
}
?>
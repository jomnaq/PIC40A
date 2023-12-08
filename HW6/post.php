#!/usr/local/bin/php 
<?php
    header('Content-Type: text/plain; charset = utf-8');

    if($_SERVER['REQUEST_METHOD'] === 'POST'){ // from blog.php
        
        if($_POST['postAuthor'] === ''){
            $author = isset($_COOKIE['username']) ? $_COOKIE['username'] : '';
        } else {
            $author = $_POST['postAuthor'];
        }
        $content = $_POST['content'];

        $postText = "<p><b>$author</b> says: $content \n\n</p>";
        if(file_exists('posts.txt')){
            $file = fopen('posts.txt', 'a');
            fwrite($file, $postText);
            fclose($file);
            echo 'post successfully written';
        } else{
            $file = fopen('posts.txt', 'w');
            fwrite($file, $postText);
            fclose($file);
            echo 'post successfully written';
        }        
    }
    else {
        echo "Nobody has made a post";
    }
?>

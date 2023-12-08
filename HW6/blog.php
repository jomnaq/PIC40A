#!/usr/local/bin/php 

<!DOCTYPE html>
<html lang = "en">

    <head>
        <meta charset="UTF-8">
        <title>Our Posts</title>
    </head>

    <body>
        <header>
            <h1>Blog posts</h1>
        </header>
            
        <main>
            <form method = "POST" action = "post.php">
                <label for = "postAuthor">Author: </label>
                <input type="text" id="postAuthor" name="postAuthor" value= "<?php echo isset($_COOKIE['username']) ? $_COOKIE['username'] : ''; ?>">
                <br>
                <label for = "content">Content: </label>
                <textarea id = "content" name = "content"></textarea>

                <input type = "submit" value = "Post">
            </form>
            <section>
                <h2>Posts by other users:</h2>
                <?php
                    $filename = 'posts.txt';
                    if(file_exists($filename)){
                        echo file_get_contents($filename);
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
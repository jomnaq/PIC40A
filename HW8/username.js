function get_username() {
    // get the cookie if there is one
    let cookie = document.cookie;
    let extracted_username = '';
    let found = false;
    const nvs = cookie.split('; ');
    for (const nv of nvs) {
      if (nv.startsWith('username=')) {
        extracted_username = nv.substring('username='.length);
        found = true;
      }
    }
  
    // figure out what page we are on
    let path = window.location.pathname;
  
    // if on login.html,
    if (path === '/~jjliu7/HW8/login.php') { 
      if (!found) { // return empty string if there is no cookie,
        return '';
      }
      // return extracted username
      return extracted_username;
    }
    else { // if on index.html with no cookie,
      if (!found) {
        // redirect back to login
        window.location.href = "https://www.pic.ucla.edu/~jjliu7/HW8/login.php";
        return ''; 
      } 
      else { // has cookie
        // add greeting to span
        let greeting_span = document.getElementById("greeting");
        let greeting_text = document.createTextNode(`Hello, ${extracted_username}!`);
        greeting_span.appendChild(greeting_text);
        return extracted_username;
      }
    }
  }
    
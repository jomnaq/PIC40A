const timer = document.getElementById('timer');
const image = document.getElementsByTagName('img')[0];
const bid = document.getElementById('bid'); 
const btn = document.getElementById('btn');

window.onload = function (){
  startTimer();
  get_display();
};

let timeoutID = null;

// PART 1
function startTimer() {
  const now = new Date();
  let endTime = new Date(now.toString());
  endTime.setMinutes(50);
  endTime.setSeconds(0);
  // The auction closes at 10 minutes to the hour.
  // There is a warning 5 minutes before that.
  // The auction is closed the last 10 minutes of the hour. 
  // Get the current minutes and seconds.
  let mins = now.getMinutes();
  let secs = now.getSeconds();
  // find countdown time:
  let timeleft = endTime - now;
  // convert to actual numbers sob
  let minsleft = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  let secsleft = Math.floor((timeleft % (1000 * 60)) / 1000);

  // display on the screen
  let timer = document.getElementById('timer');
  timer.textContent = "Time left on auction: " + minsleft + " minutes and " + secsleft + " seconds.";
  
  // Add control flow for the specific cases.
  if(mins > 45 && mins < 50){  // once we get to 45 mins, send warning (turns red)
    timer.style.color = "red";
  }
  else if (mins > 50 && mins<59){  // auction is closed
    let image = document.getElementById('img');
    image.style.opacity = "0.5";
    let bidbutton = document.getElementById('btn');
    bidbutton.disabled = true;
    timer.style.color = "black";
    timer.textContent = "The auction is closed.";
  }
  else { // nothing really changes right?
    timer.style.color = "black";
  }
  
  // The timer should start when the page loads. 
  setTimeout(function() { 
    startTimer();
  }, 1000);
}

function get_display() {
  // Write function to read the bid from a file every 5 seconds.
  // This function should start when the page is loaded. 
  timeoutID = setTimeout(get_display, 4000); // makes it a loop so it repeats
    // AJAX get request
    const request = new XMLHttpRequest();
    request.addEventListener("load", function(){
        // handle response here
        if (this.status === 200) {
        // whatever data got output (or echo'd, if you will) by the server gets stored here in `this.responseText`.
        // we get the file contents, we should print them on the screen
        // split up the responseText so that we can put it in the DOM
        let bidItems = this.responseText.split('<br />');
        // 0 = img, 1 = name, 2 = price, 3 = description
        // insert the image
        let image = document.getElementById('img');
        image.innerHTML = "<img src = " + bidItems[0] + ">";
        // insert the name
        let title = document.getElementById('title');
        title.innerHTML = bidItems[1];
        // insert the price
        let price = document.getElementById('price');
        price.innerHTML = bidItems[2];
        // insert the description
        let description = document.getElementById('descr');
        description.innerHTML = bidItems[3];
        } else {
        // `status` 200 means everything went OK. Anything else means something went wrong.
        // Use the network inspection tool to check what happened, but if you don't want
        // to do that you can also fall back to `console.log`ing stuff here.
        console.log("uh oh", this.responseText);
      }
    });
  request.open('GET', 'bids.php'); 
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send();
}

//PART 2
document.getElementById("postform").addEventListener("submit", function() {
  const req = new XMLHttpRequest();

  req.addEventListener("load", function () {
  // handle response here
  if (this.status === 200) {
    // whatever data got output (or echo'd, if you will) by the server gets stored here in `this.responseText`.
    let bidArea = document.getElementById('bid');
    bidArea.textContent = this.responseText;
    console.log(this.responseText);
  } else {
    // `status` 200 means everything went OK. Anything else means something went wrong.
    // Use the network inspection tool to check what happened, but if you don't want
    // to do that you can also fall back to `console.log`ing stuff here.
    console.log("help", this.responseText);
  }
});

req.open("POST", "bids.php"); // req.open(method, action);
req.send();
});


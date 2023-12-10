window.onload = function () {
    const submit = document.getElementById("submitButton");
    submit.addEventListener("click", readInformation);
    document.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        readInformation();
      }
    });
  };
  
// filling in username box if cookie stores previous user 
const userBox = document.getElementById("usernameBoxID");
let pastUser = get_username();
userBox.defaultValue = pastUser;
  
  function readInformation() {
    const usernameInput = document.getElementById("usernameBoxID");
    validate_username(usernameInput.value);
  }
  
  function validate_username(username) {
    let error = false;
    let errormsg = "";
    // check that it's in the correct form for first 7 bullet points
    if (username.length < 5) {
      errormsg += "Username must be 5 characters or longer.\n";
      error = true;
    }
    if (username.length > 40) {
      errormsg += "Username cannot be more than 40 characters.\n";
      error = true;
    }
    if (username.indexOf(" ") !== -1) {
      errormsg += "Username cannot contain spaces.\n";
      error = true;
    }
    if (username.indexOf(",") !== -1) {
      errormsg += "Username cannot contain commas.\n";
      error = true;
    }
    if (username.indexOf(";") !== -1) {
      errormsg += "Username cannot contain ;\n";
      error = true;
    }
    if (username.indexOf("=") !== -1) {
      errormsg += "Username cannot contain =\n";
      error = true;
    }
    if (username.indexOf("&") !== -1) {
      errormsg += "Username cannot contain &\n";
      error = true;
    }
    if (error) {
      alert(errormsg);
      return false;
    }
  
    // last bullet point
    if (error === false) {
      const allowedChar = new Set(); // use set to store allowed characters
      let allowedString =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()-_+[]{}:'|`~<.>/?";
      for (let char of allowedString) {
        allowedChar.add(char);
      }
      // checking if each character is in the set of allowed characters
      for (let userChar of username) {
        if (allowedChar.has(userChar) === false) {
          alert(
            "Username can only use characters from the following string:\nabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789\n!@#$%^*()-_+[]{}:'|`~<.>/?"
          );
          return false;
        }
      }
    }
  
    // username is fine
    if (error === false) {
      // Also make a new cookie.
      document.cookie = `username=${username}; expires=${inAnHour()};`;
      return true;
    }
  }

function inAnHour() {
  let in_an_hour = new Date();
  in_an_hour.setHours(in_an_hour.getHours() + 1);
  return in_an_hour.toUTCString();
}

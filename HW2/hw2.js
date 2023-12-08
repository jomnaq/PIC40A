// PIC 40A HW2
// Joanna Liu
// 405 957 891

/**
Returns the sales total including a 
7.25% sales tax on the total sale. 

Note that sales tax is rounded normally with one exception...
Bankers rounding rounds the half-cent conditionally. 
If the cent value of the tax total is odd, the 0.5 (half-cent) rounds upwards; 
If the cent value is even, the half-cent rounds it downwards.
So $0.065 is rounded to $0.06 but $0.075 is rounded to $0.08.
Banker's rounding only takes place on the tax value. 

@return {string} The receipt of items with tax. 
*/
function sales_total(arr) {
  // add up all the items in the array
  let subtotal = 0;
  for (let elem of arr) {
    subtotal += elem;
  }

  // calculate sales tax
  let tax = subtotal * 0.0725;

  // Bankers rounding:
  tax = Number.parseFloat(tax).toFixed(3);
  let lastDigit = tax.at(-1);
  if (Number(lastDigit) === 5) {
    // use banker's rounding
    let evenOrOdd = Number(tax.at(-2));
    if (evenOrOdd % 2 === 0) {
      // if even, round down
      tax = tax.substring(0, tax.length - 1);
    } else {
      // odd, so round up (rounds normally)
      tax = Number.parseFloat(tax).toFixed(2);
    }
  } else {
    // round normally
    tax = Number.parseFloat(tax).toFixed(2);
  }

  tax = Number(tax);

  // add total to sales tax
  let total = Number.parseFloat(subtotal + tax).toFixed(2);

  // return string
  return (
    "  $" +
    Number.parseFloat(subtotal).toFixed(2) +
    "\n+ sales tax (7.25%) \n= $" +
    total
  );
}

/**
  This function extracts from a given cookie
  the 'value' corresponding to the 'name' "username".
  
  For example, both of the following function calls return "bur=nett":
  . extract_username("first_name=Sarah; last_name=Burnett; username=bur=nett");
  . extract_username("username=bur=nett; first_name=Sarah; last_name=Burnett");
  
  If the given cookie has no 'name' called "username",
  then the function returns the empty string.
  
  For example, we have
  . extract_username("common_error=Sara; " + 
                     "another_one=Burnet; another=Sarah_Brunette") === "";
  
  @param  {string} cookie : The cookie to extract information from.
  @return {string} The 'value' corresponding to the 'name' "username";
                   the empty string if "username" is not a 'name'.
  */

function extract_username(cookie) {
  // find 'username=' in the cookie
  let index = cookie.indexOf("username=");
  // extract the string after until you reach a semicolon or unallowed character
  if (index === -1) {
    return ""; // return empty string if username is not found
  } else if (index !== 0 && cookie[index - 1] !== " ") {
    return "";
  } else {
    // extract the string following 'username='
    // whitespace, semicolon, and commas are not allowed
    let name = "";
    index += "username=".length;
    while (cookie[index] !== ";" && index < cookie.length) {
      if (cookie[index] === " " || cookie[index] === ",") {
        return ""; // illegal character in cookie
      }
      name += cookie[index];
      index++;
    }
    if (cookie[index + 1] !== " " && index < cookie.length) {
      return ""; // improper semicolon use
    }
    return name;
  }
}

/**
   This function validates a username.
   A string should be printed to the console after the username is evaluated.
   It'll be determined acceptable or relavent username errors will be printed.
   String formatting details are outlined in hw2.pdf.
  
   @param  {string} username : The username to validate.
   */

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
    console.log(errormsg);
    return;
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
        console.log(
          "Username can only use characters from the following string:\nabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789\n!@#$%^*()-_+[]{}:'|`~<.>/?"
        );
        return;
      }
    }
  }

  // username is fine
  if (error === false) {
    console.log("The username " + username + " is acceptable.");
    return;
  }
}

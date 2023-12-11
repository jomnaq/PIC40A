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
  // fill in   
}

// prices = [2.00];
// console.log(sales_total(prices));
// should print 2.14



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
  // fill in
}

/**
 This function validates a username.
 A string should be printed to the console after the username is evaluated.
 It'll be determined acceptable or relavent username errors will be printed.
 String formatting details are outlined in hw2.pdf.

 @param  {string} username : The username to validate.
 */

function validate_username(username) {
  // fill in
}

//validate_username(", ,=");
//validate_username("Saraé"); 

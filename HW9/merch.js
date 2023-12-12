
//--------------------- SETTING UP -----------------------//
const prices = [100, 13, 16.2, 10.05];
const items = 4; // number of items for sale
const checkout_btn = document.getElementById("checkoutButton");
const credit_para = document.getElementsByTagName("p")[1];
const coupon_box = document.getElementById("couponID");
const receipt = document.getElementById("receiptId");
// arrays of document elements
const spans = []; // where the prices will be displayed
const images = [];
const checkboxes = [];
// filling the arrays declared above 
for (let i = 0; i < items; ++i) {
  spans[i] = document.getElementsByTagName("span")[i]; // getting spans
  images[i] = document.getElementsByTagName("img")[i]; // getting images
  checkboxes[i] = document.getElementsByTagName("input")[i]; // getting checkboxes
}

let credit = credit_para.textContent;

// Put the prices in the spans
function insertPrices() {
  for (let i = 0; i < items; ++i) {
    const item_price = document.createTextNode(
      `\$${Number.parseFloat(prices[i]).toFixed(2)} `
    );
    spans[i].appendChild(item_price);
  }
}
// for image event listeners
function checkingBoxes(i) {
  return function () {
    if (!checkboxes[i].disabled) {
      checkboxes[i].checked = !checkboxes[i].checked;
    }
  };
}
// Add 6 event listeners for images
function imageListeners() {
  for (let i = 0; i < items; i++) {
    images[i].addEventListener("click", checkingBoxes(i));
  }
}
// Event listener for checkout button
checkout_btn.addEventListener("click", function () {
  validate_coupon_code(coupon_box.value);
  sales_total();
  update_credit();
});

// Event Listener for pressing enter
document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    validate_coupon_code(coupon_box.value);
    sales_total();
    update_credit();
  }
});

//---------------------------------- ACTIONS ----------------------------------//
// updates on screen credit
function update_credit() {
  const request = new XMLHttpRequest();
  request.addEventListener("load", function(){
    if(this.status === 200){
      // ajax request finishes, 
      const updatedCredit = Number.parseFloat(this.responseText).toFixed(2);
      credit_para.textContent = `Your credit: \$${updatedCredit}`;
      console.log(updatedCredit);
    } else {
      console.log("something is wrong!");
    }
  });
  
  request.open('POST', 'money.php');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // getting parameters
  let username = document.cookie.split('=')[1];
  username = username.split(';')[0];
  console.log(username);
  console.log(credit);
  // send data
  const data = `username=${username}&credit=${Number.parseFloat(credit).toFixed(2)}`;
  request.send(data.toString());
}

// checks if coupon is valid + adds to credit + resets box/receipt
function validate_coupon_code(code) {
  if (code === "COUPON5") {
    credit += 5;
  } else if (code === "COUPON10") {
    credit += 10;
  } else if (code === "COUPON20") {
    credit += 20;
  }
  receipt.textContent = "";
  coupon_box.value = "";
}

let checkouts_complete = 0;
function sales_total() {
  // Calculate the price from only the checked checkboxes
  let checkedBoxes = 0;
  let subtotal = 0;
  for (let i = 0; i < items; ++i) {
    if (checkboxes[i].checked) {
      checkedBoxes++;
      subtotal += prices[i];
    }
  }

  // Calculate the price with tax
  let tax = subtotal * 0.0725;
  // Bankers rounding:
  tax = Number.parseFloat(tax).toFixed(3);
  let lastDigit = tax.at(-1);
  if (Number(lastDigit) === 5) {
    // use banker's rounding
    let evenOrOdd = Number(tax.at(-2));
    a;
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

  // Check if you have insufficient credit
  if (total > credit) {
    alert("You have insufficient credit for this purchase.");
    return;
  }

  // Otherwise update your credit
  credit -= total;

  // Also, check if there are no checked boxes (no displayed message).
  if (checkedBoxes === 0) {
    if (checkouts_complete === 0) {
      return;
    } else {
      receipt.textContent = "";
      return;
    }
  }

  for (let i = 0; i < items; ++i) {
    if (checkboxes[i].checked) {
      // Change checked boxes to be disabled + unchecked
      checkboxes[i].disabled = true;
      checkboxes[i].checked = false;
      // Disabling changing for images as well
      images[i].removeEventListener("click", checkingBoxes(i));
    }
  }

  // Update the message in the bottom <p> element.
  const subtotalText = document.createTextNode("\u00A0\u00A0\u00A0" + 
    `\$${Number.parseFloat(subtotal).toFixed(2)}`
  );
  const salesTaxText = document.createTextNode("+ sales tax (7.25%)");
  const totalText = document.createTextNode(`= \$${total}`);
  const newLine1 = document.createElement("br");
  const newLine2 = document.createElement("br");

  receipt.appendChild(subtotalText);
  receipt.appendChild(newLine1);
  receipt.appendChild(salesTaxText);
  receipt.appendChild(newLine2);
  receipt.appendChild(totalText);
  checkouts_complete++;
}


window.onload = function () {
  insertPrices();
  update_credit();
  imageListeners();
};
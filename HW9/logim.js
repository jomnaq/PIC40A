window.onload = function () {
  const submit = document.getElementById("submitButton");
  submit.addEventListener("click", mock);
  document.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      mock();
    }
  });
};

let submitCounter = 1; 

function mock() {
  const passwordInput = document.getElementById("passwordBoxID");

  // print password out
const new_p = document.createElement('p');
const boldPass = document.createElement('strong'); // Create a <strong> element
boldPass.textContent = passwordInput.value; // Set the password value as the content of the <strong> element

const period = document.createTextNode("."); // Create a text node for the non-bold text

new_p.textContent = "Somebody knows the password you like to use is ";
new_p.appendChild(boldPass); // Append the <strong> element to the paragraph
new_p.appendChild(period); // Append the non-bold text

const insertSection = document.getElementsByTagName('section')[0];

insertSection.appendChild(new_p);

  // add ha
  let header = document.getElementsByTagName('h1');
  if (submitCounter === 1) {
    header[0].innerHTML = 'HA';
    ++submitCounter;
  }
  else {
    header[0].innerHTML += 'HA';
    ++submitCounter;
  }
}
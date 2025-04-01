document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const password = document.getElementById('password').value.trim();
    const remember = document.getElementById('remember').checked;
    const age = parseInt(document.getElementById('age').value.trim());
    const state = document.getElementById('state').value;
    const classInput = document.querySelector('input[name="class"]:checked');
  
    if (!firstName || !lastName || !password) {
      alert("Please fill in First Name, Last Name, and Password.");
      return;
    }
  
    if (isNaN(age) || age < 18 || age > 99) {
      alert("Please enter a valid age between 18 and 99.");
      return;
    }
  
    if (!classInput) {
      alert("Please select a class.");
      return;
    }
  
    if (state === "blank") {
      alert("Please select a state.");
      return;
    }
  
    const formData = {
      firstName,
      lastName,
      password,
      remember,
      age,
      state,
      class: classInput.value
    };
  
    console.log("Form Data Submitted:", formData);
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submit.json", true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const responseBox = document.getElementById("responseMessage");
  
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            responseBox.innerText = response.message;
          } catch (e) {
            responseBox.innerText = "Form submitted, but response could not be read.";
          }
  
          responseBox.style.color = "#2c6ca9";
          responseBox.style.fontWeight = "bold";
  
          document.getElementById("myForm").reset();
  
        } else {
          alert("There was a problem submitting the form.");
        }
      }
    };
  
    xhr.send();
  });
  
  
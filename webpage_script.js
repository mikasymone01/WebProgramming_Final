window.addEventListener("load", () => {
  let user = JSON.parse(localStorage.getItem("logged_in"));
  console.log("accessed");
  if (user.length > 0) {
    user.toString();
    console.log("accessed");
    document
      .getElementById("logout_button")
      .setAttribute("style", "display: block !important;");
    document
      .getElementById("login_button")
      .setAttribute("style", "display: none !important;");
    document
      .getElementById("register_button")
      .setAttribute("style", "display: none !important;");

    document.getElementById("title").textContent =
      "Welcome " + user[0].user_email + "!";

    var cards = document.getElementsByClassName("card_link");
    for (let i = 0; i < cards.length; i++) {
      cards[i].innerHTML = "Start";
      cards[i].setAttribute(
        "style",
        "pointer-events: visible; cursor: pointer;"
      );
    }
  } else {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add("inactiveLink");
    }
  }
});

function makeAccount(event) {
  let email = document.forms["sign_in_form"]["email"].value;
  let password = document.forms["sign_in_form"]["pwd"].value;
  let password_confirm = document.forms["sign_in_form"]["pwd_confirm"].value;

  if (email !== "" && password !== "" && password === password_confirm) {
    let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    let exists =
      allUsers.length &&
      JSON.parse(localStorage.getItem("allUsers")).some(
        (user_data) => user_data.user_email.toLowerCase() == email.toLowerCase()
      );
    if (!exists) {
      allUsers.push({
        user_email: email,
        user_password: password,
      });
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      return true;
    } else {
      alert("User already has an account");
      event.preventDefault();
    }
  } else {
    alert("Entry empty or passwords do not match");
    event.preventDefault();
  }
}

function loginUser(event) {
  let email = document.forms["login"]["email"].value;
  let password = document.forms["login"]["pwd"].value;

  if (email !== "" && password !== "") {
    let allUsers = JSON.parse(localStorage.getItem("allUsers"));
    let logged_in = JSON.parse(localStorage.getItem("logged_in")) || [];
    let exists;
    for (let i = 0; i < allUsers.length; ) {
      console.log(allUsers[i].user_email);
      console.log(allUsers[i].user_password);
      console.log(email);
      console.log(password);
      if (
        allUsers[i].user_email === email &&
        allUsers[i].user_password === password
      ) {
        exists = true;
      }
      i++;
    }
    if (!exists) {
      alert("Username or password incorrect");
      event.preventDefault();
    } else {
      logged_in.push({
        user_email: email,
      });
      localStorage.setItem("logged_in", JSON.stringify(logged_in));
    }
  } else {
    alert("Entry empty");
    event.preventDefault();
  }
}

function Logout() {
  let logged_in = [];
  localStorage.setItem("logged_in", JSON.stringify(logged_in));
  document
    .getElementById("logout_button")
    .setAttribute("style", "display: block !important;");
  document
    .getElementById("login_button")
    .setAttribute("style", "display: none !important;");
  document
    .getElementById("register_button")
    .setAttribute("style", "display: none !important;");
}

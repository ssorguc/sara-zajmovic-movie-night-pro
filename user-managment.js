'use strict';

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

const users = [
  new User("user1", "pass123"),
  new User("user2", "lozinkica"),
];

let userNavbar = document.getElementById("user-nav");
userNavbar.hidden = true;

let usernameNav = document.getElementById("username-nav");

const user = localStorage.getItem("user");
if(!(user === undefined || user === null || user === "")){
   document.getElementById("lognav").hidden = true;
  userNavbar.hidden = false;
  usernameNav.textContent = user;
}

function attemptLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let user = users.find(user => user.username === username && user.password === password)
  if (user !== undefined) {
    document.getElementById("loginMessage").style.color = "yellow";
    document.getElementById("loginMessage").innerHTML = "Login successful";
    document.getElementById("loginForm").hidden = true;
    document.getElementById("lognav").hidden = true;
    localStorage.setItem('user', username);
    userNavbar.hidden = false;
    usernameNav.textContent = username;
  }
  else {
    document.getElementById("loginMessage").style.color = "red";
    document.getElementById("loginMessage").innerHTML = "Login failed";
  }
}

function createAccount() {
  let newUsername = document.getElementById("usernameSignUp").value;
  let newPass = document.getElementById("passwordSignUp").value;

  let postojeciUser = users.find(user => user.username === newUsername);

  if (postojeciUser === undefined) {
    let newUser = new User(newUsername, newPass);
    users.push(newUser);
    document.getElementById("signupMessage").innerHTML = "You have created and account. Welcome!"
    document.getElementById("signupForm").hidden = true;
    let nazad = document.getElementById("signupBox");
    nazad.textContent = "Back to home page";
    nazad.href = "index.html";
    nazad.id = "nazadic";
    localStorage.setItem('user', newUsername);
    document.getElementById("lognav").hidden = true;
    userNavbar.hidden = false;
    usernameNav.textContent = newUsername;
  } else {
    document.getElementById("signupMessage").innerHTML = "Username is taken"
  }
}

function logout(){
  userNavbar.hidden = true;
  localStorage.setItem("user", "");
  document.getElementById("lognav").hidden = false;
}
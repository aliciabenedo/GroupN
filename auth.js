async function signup() {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
      alert("Please enter both email and password.");
      return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(user => user.email === email);
  if (userExists) {
      alert("User  already exists.");
      return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please log in.");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
      alert("Please enter both email and password.");
      return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
      alert("Invalid email or password.");
      return;
  }

  localStorage.setItem("currentUser ", JSON.stringify(user));

  if (document.getElementById("rememberMe").checked) {
      localStorage.setItem("userEmail", email);
  } else {
      localStorage.removeItem("userEmail");
  }

  alert("Login successful!");
  window.location.href = "account.html";
}


function changePassword() {
  const current = document.getElementById("currentPassword").value;
  const newPass = document.getElementById("newPassword").value;
 let user = JSON.parse(localStorage.getItem("currentUser "));
  const users = JSON.parse(localStorage.getItem("users"));
if (current !== user.password) {
   alert("Current password incorrect!");
      return;
  }

  user.password = newPass;
  const userIndex = users.findIndex(u => u.email === user.email);
  users[userIndex].password = newPass; 
  localStorage.setItem("users", JSON.stringify(users)); 
  localStorage.setItem("currentUser ", JSON.stringify(user)); 
  alert("Password updated!");
}

function deleteAccount() {
  const user = JSON.parse(localStorage.getItem("currentUser "));
  const users = JSON.parse(localStorage.getItem("users"));

  const updatedUsers = users.filter(u => u.email !== user.email);
  localStorage.setItem("users", JSON.stringify(updatedUsers)); 
  localStorage.removeItem("currentUser "); 
  alert("Account deleted successfully.");
  window.location.href = "signup.html"; 
}

function logout() {
  localStorage.removeItem("currentUser ");
  window.location.href = "login.html";
}

const rememberedEmail = localStorage.getItem("userEmail");
if (rememberedEmail) {
  document.getElementById("email").value = rememberedEmail;
}
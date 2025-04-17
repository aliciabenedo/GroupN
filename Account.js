document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
      alert("You are not logged in. Redirecting to login page.");
      window.location.href = "login.html"; 
  } else {
      document.getElementById("emailDisplay").textContent = user.email || "Not Set";
  }
});


function changePassword() {
  const current = document.getElementById("currentPassword").value;
  const newPass = document.getElementById("newPassword").value;

  let user = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users"));

  if (current !== user.password) {
      alert("Current password incorrect!");
      return;
  }

  user.password = newPass;
  const userIndex = users.findIndex(u => u.email === user.email);
  users[userIndex].password = newPass; 
  localStorage.setItem("users", JSON.stringify(users)); 
  localStorage.setItem("currentUser", JSON.stringify(user)); 
  alert("Password updated!");
}


function deleteAccount() {
const user = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users"));

  const updatedUsers = users.filter(u => u.email !== user.email);
  localStorage.setItem("users", JSON.stringify(updatedUsers)); 
  localStorage.removeItem("currentUser"); 
  alert("Account deleted successfully.");
  window.location.href = "signup.html"; 
}


function logout() {
localStorage.removeItem("currentUser");
window.location.href = "login.html";
}


function goBack() {
window.history.back();
}
function login() {
const email = document.getElementById("login-email").value.trim();
const password = document.getElementById("login-password").value.trim();
const storedEmail = localStorage.getItem("userEmail");
const storedPassword = localStorage.getItem("userPassword");

if (email === storedEmail && password === storedPassword) {
alert("Login successful! Redirecting to dashboard...");
window.location.href = "fitness.html";
} else {

    alert("Invalid email or password. Please try again.");

    }
}

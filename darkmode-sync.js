document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Handle checkbox toggle (used in login/account/motivation etc.)
  const checkboxToggle = document.getElementById("darkModeToggle");
  const savedMode = localStorage.getItem("darkMode");

  if (savedMode === "enabled") {
    body.classList.add("dark-mode");
    if (checkboxToggle) checkboxToggle.checked = true;
  }
    if (checkboxToggle) {
    checkboxToggle.addEventListener("change", () => {
      const enabled = checkboxToggle.checked;
      body.classList.toggle("dark-mode", enabled);
      localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
    });
  }

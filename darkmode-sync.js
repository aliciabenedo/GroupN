document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

 
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

  const themeButton = document.getElementById("themeToggle");
  if (themeButton) {
    const updateThemeButton = () => {
      themeButton.textContent = body.classList.contains("dark-mode")
        ? " Light Mode"
        : " Dark Mode";
    };

    updateThemeButton(); // Set initial text

    themeButton.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const newMode = body.classList.contains("dark-mode") ? "enabled" : "disabled";
      localStorage.setItem("darkMode", newMode);
      updateThemeButton();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
      body.classList.add("dark-mode");
      toggle.checked = true;
  }
  toggle.addEventListener("change", () => {
      if (toggle.checked) {
          body.classList.add("dark-mode");
          localStorage.setItem("darkMode", "enabled");
      } else {
          body.classList.remove("dark-mode");
          localStorage.setItem("darkMode", "disabled");
      }
  });
});
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateThemeButton();
};


const updateThemeButton = () => {
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
};


const loadTheme = () => {
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', savedTheme === 'dark');
updateThemeButton();
};


document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleDarkMode);
  }
});
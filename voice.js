
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  console.log("Heard:", transcript);

  if (transcript.includes("start timer")) startTimer?.();
  else if (transcript.includes("pause timer")) pauseTimer?.();
  else if (transcript.includes("reset timer")) resetTimer?.();
  else if (transcript.includes("add task")) addTaskVoice(transcript);
  else if (transcript.includes("dark mode") || transcript.includes("light mode")) toggleDarkMode(transcript);
};

function addTaskVoice(transcript = "") {
  const match = transcript.match(/add task (.+)/);
  const taskTitle = match ? match[1] : "Voice Task";

  const taskInput = document.getElementById("taskInput");
  if (taskInput) {
    taskInput.value = taskTitle;
    addTask(); // use existing addTask() function
  }
}

function toggleDarkMode(command = "") {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (!toggle) return;

  const isDark = body.classList.contains("dark-mode");

  if (command.includes("dark") && !isDark) {
    toggle.checked = true;
    toggle.dispatchEvent(new Event("change"));
  } else if (command.includes("light") && isDark) {
    toggle.checked = false;
    toggle.dispatchEvent(new Event("change"));
  }
}

function startVoiceCommands() {
  recognition.start();
  alert("Voice commands activated. Try saying 'Start Timer', 'Add Task finish homework', or 'Light Mode'.");
}
let timer;
let isRunning = false;
let timeLeft = 0;
let workoutHistory = [];
 
const updateTimerDisplay = () => {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  document.getElementById('workoutTimer').textContent =
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
 
const clearTimerDisplay = () => {
  timeLeft = 0;
  document.getElementById('workoutTimer').textContent = "00:00:00";
};
 
const clearCustomInputs = () => {
  document.getElementById('hours').value = "";
  document.getElementById('minutes').value = "";
  document.getElementById('seconds').value = "";
};

const MAX_DURATION = 86400; // 24 hours in seconds
 
const startTimer = () => {
  if (isNaN(timeLeft) || timeLeft <= 0) {
    alert("Not a number! Please set a valid duration before starting.");
    clearTimerDisplay();
    clearCustomInputs();
    return;
  }
 
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        completeWorkoutSession();
      }
    }, 1000);
  }
};
 
const pauseTimer = () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
};
 
const resetTimer = () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  updateTimerDisplay();
};
 
const setDuration = () => {
  const selectedValue = document.getElementById('durationSelect').value;

  if (selectedValue === 'custom') {
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);

    if (isNaN(hours) && isNaN(minutes) && isNaN(seconds)) {
      alert("Not a number! Please enter a valid custom time.");
      clearTimerDisplay();
      clearCustomInputs();
      return;
    }

    timeLeft =
      (isNaN(hours) ? 0 : hours * 3600) +
      (isNaN(minutes) ? 0 : minutes * 60) +
      (isNaN(seconds) ? 0 : seconds);

  } else {
    timeLeft = parseInt(selectedValue);
  }

  if (isNaN(timeLeft) || timeLeft <= 0) {
    alert("Not a number! Please enter a valid duration.");
    clearTimerDisplay();
    clearCustomInputs();
    return;
  }

  // ✅ Limit to 24 hours max
  if (timeLeft > MAX_DURATION) {
    alert("Time limit exceeded. Please enter a value under 24 hours.");
    clearTimerDisplay();
    clearCustomInputs();
    return;
  }

  updateTimerDisplay();
};
 
const addTime = () => {
  const hours = parseInt(prompt("Enter additional hours:")) || 0;
  const minutes = parseInt(prompt("Enter additional minutes:")) || 0;
  const seconds = parseInt(prompt("Enter additional seconds:")) || 0;
  timeLeft += (hours * 3600) + (minutes * 60) + seconds;
  updateTimerDisplay();
};
 
const updateWorkoutHistory = () => {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  workoutHistory.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
};
 
function completeWorkoutSession() {
  alert("Workout session completed!");
 
  // Confetti
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
 
  // Sound effect
  document.getElementById("dingSound").play();
 
  //Update fitness session count
  let sessions = parseInt(localStorage.getItem("fitnessSessions") || "0");
  localStorage.setItem("fitnessSessions", sessions + 1);
 
  //Save to workout history
  const completedOn = new Date().toLocaleString();
  workoutHistory.push(`Completed on ${completedOn}`);
  updateWorkoutHistory();
 
  timeLeft = 0;
  updateTimerDisplay();
}
 
document.getElementById('durationSelect').addEventListener('change', (event) => {
  const customInputs = document.getElementById('customInputs');
  customInputs.style.display = event.target.value === 'custom' ? 'block' : 'none';
});
 
document.getElementById('setDurationBtn').addEventListener('click', setDuration);
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('addTimeBtn').addEventListener('click', addTime);
document.getElementById('historyBtn').addEventListener('click', () => {
  const historySection = document.getElementById('historySection');
  historySection.style.display = historySection.style.display === 'none' ? 'block' : 'none';
  updateWorkoutHistory();
});
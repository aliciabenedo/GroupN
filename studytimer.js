let timer;
let running = false;
let remainingTime;

function startTimer() {
  if (!running) {
    let minutes = parseInt(document.getElementById("studyDuration").value);
    let timeInSeconds = minutes * 60;

    if (!remainingTime) {
      remainingTime = timeInSeconds;
    }

    running = true;
    timer = setInterval(() => {
      let mins = Math.floor(remainingTime / 60);
      let secs = remainingTime % 60;
      document.getElementById("timerDisplay").textContent =
        `${mins}:${secs < 10 ? "0" + secs : secs}`;

      if (remainingTime > 0) {
        remainingTime--;
      } else {
        clearInterval(timer);
        running = false;
        completeStudySession();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  remainingTime = null;
  resetTimerDisplay();
}

function resetTimerDisplay() {
  let defaultMinutes = parseInt(document.getElementById("studyDuration").value);
  document.getElementById("timerDisplay").textContent = `${defaultMinutes}:00`;
}

function completeStudySession() {
  alert("Study session completed!");

  // Confetti
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Sound effect
  document.getElementById("dingSound").play();

  // Update session count
  let sessions = parseInt(localStorage.getItem("studySessions") || "0");
  localStorage.setItem("studySessions", sessions + 1);

  // Update streak
  updateStreak("study");
  showStreakMessage();

  remainingTime = null;
  resetTimerDisplay();
}

function updateStreak(type) {
  const today = new Date().toDateString();
  const key = `${type}LastDate`;
  const streakKey = `${type}Streak`;

  const lastDate = localStorage.getItem(key);
  const currentStreak = parseInt(localStorage.getItem(streakKey)) || 0;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate === today) return;

  if (new Date(lastDate).toDateString() === yesterday.toDateString()) {
    localStorage.setItem(streakKey, currentStreak + 1);
  } else {
    localStorage.setItem(streakKey, 1);
  }

  localStorage.setItem(key, today);
}

function showStreakMessage() {
  const streak = localStorage.getItem("studyStreak") || 0;
  document.getElementById("streak-message").textContent = `🔥 You're on a ${streak}-day streak!`;
}

document.addEventListener("DOMContentLoaded", () => {
  showStreakMessage();
});

let timeLeft = 0;
let isRunning = false;
let timer;
let initialWorkoutDuration = 0; 
const workoutTimer = document.getElementById("workoutTimer");
const durationSelect = document.getElementById("durationSelect");
const customInputs = document.getElementById("customInputs");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const historyList = document.getElementById("historyList");
const historySection = document.getElementById("historySection");
let workoutHistory = [];

function startTimer() {
    if (!isRunning && timeLeft > 0) {
        isRunning = true;
        timer = setInterval(() => {
        if (timeLeft > 0) {
         timeLeft--;
         updateTimerDisplay();
         } else {
         clearInterval(timer);
         isRunning = false;
         saveWorkoutHistory();
         alert("Workout Complete!");
         }
      
        }, 1000);
    }

}


function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}


function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 0;
    initialWorkoutDuration = 0;
    updateTimerDisplay();
}


function updateTimerDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;
    workoutTimer.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function setDuration() {
    let selectedValue = durationSelect.value;
    if (selectedValue === "custom") {
        let hoursToAdd = parseInt(hoursInput.value) || 0;
        let minutesToAdd = parseInt(minutesInput.value) || 0;
        let secondsToAdd = parseInt(secondsInput.value) || 0;

        if (hoursToAdd < 0 || minutesToAdd < 0 || secondsToAdd < 0) {
            alert("Please enter valid hours, minutes, and seconds.");
            return;
        }

        timeLeft = (hoursToAdd * 3600) + (minutesToAdd * 60) + secondsToAdd;
        } else {
        timeLeft = parseInt(selectedValue);
    }

    initialWorkoutDuration = timeLeft; 
    updateTimerDisplay();
}

function addTime() {
    let hoursToAdd = parseInt(prompt("Enter hours to add:")) || 0;
    let minutesToAdd = parseInt(prompt("Enter minutes to add:")) || 0;
    let secondsToAdd = parseInt(prompt("Enter seconds to add:")) || 0;

    if (hoursToAdd < 0 || minutesToAdd < 0 || secondsToAdd < 0) {
        alert("Please enter valid numbers.");
        return;
    }

    let addedSeconds = (hoursToAdd * 3600) + (minutesToAdd * 60) + secondsToAdd;
    timeLeft += addedSeconds;
    initialWorkoutDuration += addedSeconds; // Also update the stored duration

    updateTimerDisplay();
}


function saveWorkoutHistory() {
    let completedMinutes = Math.floor(initialWorkoutDuration / 60);
    let completedSeconds = initialWorkoutDuration % 60;

    let timeCompleted = `${completedMinutes} minute${completedMinutes !== 1 ? 's' : ''}`;
    if (completedSeconds > 0) {
    timeCompleted += ` and ${completedSeconds} second${completedSeconds !== 1 ? 's' : ''}`;
    }

    let date = new Date().toLocaleString();
    workoutHistory.push(`${timeCompleted} - ${date}`);

    updateHistoryDisplay();
}


function updateHistoryDisplay() {
historyList.innerHTML = "";
workoutHistory.forEach(entry => {
 let li = document.createElement("li");
 li.textContent = entry;
historyList.appendChild(li);


    });
}


document.getElementById("historyBtn").addEventListener("click", () => {
    historySection.style.display = historySection.style.display === "none" ? "block" : "none";
});

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("setDurationBtn").addEventListener("click", setDuration);
document.getElementById("addTimeBtn").addEventListener("click", addTime);

durationSelect.addEventListener("change", () => {
    customInputs.style.display = durationSelect.value === "custom" ? "block" : "none";
});

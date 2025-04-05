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
const startTimer = () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alert("Time's up!");
                isRunning = false;
                const completedOn = new Date().toLocaleString(); 
                const totalHours = Math.floor(timeLeft / 3600);
                const totalMinutes = Math.floor((timeLeft % 3600) / 60);
                const totalSeconds = timeLeft % 60;
                workoutHistory.push(`${totalHours}h ${totalMinutes}m ${totalSeconds}s - Completed on ${completedOn}`);
                updateWorkoutHistory();
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
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        timeLeft = (hours * 3600) + (minutes * 60) + seconds;
    } else {
        timeLeft = parseInt(selectedValue);
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
document.getElementById('durationSelect').addEventListener('change', (event) => {
    const customInputs = document.getElementById('customInputs');
    if (event.target.value === 'custom') {
        customInputs.style.display = 'block'; 
    } else {
        customInputs.style.display = 'none'; 
    }
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
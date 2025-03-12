document.addEventListener("DOMContentLoaded", function () {
    // Get stored task and session data
    let pendingTasks = localStorage.getItem("pendingTasks") || 0;
    let completedTasks = localStorage.getItem("completedTasks") || 0;
    let studySessions = localStorage.getItem("studySessions") || 0;
    let fitnessSessions = localStorage.getItem("fitnessSessions") || 0;

    // Display data on the dashboard
    document.getElementById("pending-tasks").textContent = pendingTasks;
    document.getElementById("completed-tasks").textContent = completedTasks;
    document.getElementById("study-sessions").textContent = studySessions;
    document.getElementById("fitness-sessions").textContent = fitnessSessions;
});

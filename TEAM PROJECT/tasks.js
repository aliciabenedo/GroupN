document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let taskDeadline = document.getElementById("taskDeadline").value;
    let taskCategory = document.getElementById("taskCategory").value;

    if (taskInput === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        text: taskInput,
        deadline: taskDeadline,
        category: taskCategory,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDeadline").value = "";

    loadTasks();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    let completedList = document.getElementById("completedTasks");

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    let pendingCount = 0;
    let completedCount = 0;

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${task.text} (${task.category}) - Due: ${task.deadline}
            <button onclick="completeTask(${index})">✔</button>
            <button onclick="deleteTask(${index})">✖</button>
        `;

        if (task.completed) {
            li.classList.add("completed");
            completedList.appendChild(li);
            completedCount++;
        } else {
            taskList.appendChild(li);
            pendingCount++;
        }
    });

    // Update dashboard values
    localStorage.setItem("pendingTasks", pendingCount);
    localStorage.setItem("completedTasks", completedCount);
}

function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

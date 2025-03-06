document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let category = document.getElementById("category").value;
    let deadline = document.getElementById("deadline").value;
    if (!taskInput || !deadline) {
        alert("Please enter a task and select a deadline.");
        return;
    }

    let task = {
        id: Date.now(),
        text: taskInput,
        category: category,
        deadline: deadline,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    document.getElementById("taskInput").value = "";
}

function renderTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} - <small>${task.category.toUpperCase()}</small> - Due: ${task.deadline}
            </span>
            <div>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    checkReminders();
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find(t => t.id === id);
    let newText = prompt("Edit task:", task.text);
    if (newText) {
        task.text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function loadTasks() {
    renderTasks();
}

function checkReminders() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (!task.completed) {
            let deadline = new Date(task.deadline).getTime();
            let now = new Date().getTime();
            let timeLeft = deadline - now;
            if (timeLeft <= 86400000) { // 1 day left
                setTimeout(() => {
                    alert(`Reminder: Your task "${task.text}" is due soon!`);
                }, 1000);
            }
        }
    });
}

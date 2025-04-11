document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
  
    new Sortable(document.getElementById("taskList"), {
      animation: 150,
      onEnd: saveReorderedTasks
    });
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
  
    localStorage.setItem("pendingTasks", pendingCount);
    localStorage.setItem("completedTasks", completedCount);
  }
  
  function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    // sound effect
    let ding = new Audio("ding.mp3");
    ding.play();
  
    loadTasks();
  }
  
  function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
  
  function saveReorderedTasks(evt) {
    const taskList = document.getElementById("taskList").children;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
  
    let reordered = [];
  
    for (let li of taskList) {
      const text = li.textContent.split("done")[0].trim().split(" (")[0];
      const task = pendingTasks.find(t => t.text === text);
      if (task) reordered.push(task);
    }
  
    localStorage.setItem("tasks", JSON.stringify([...reordered, ...completedTasks]));
  }
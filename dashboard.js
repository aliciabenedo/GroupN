document.addEventListener('DOMContentLoaded', function () {
    function updateTaskSummary() {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      let pendingTasks = tasks.filter(task => !task.completed).length;
      let completedTasks = tasks.filter(task => task.completed).length;
  
      document.getElementById('pending-tasks').textContent = pendingTasks;
      document.getElementById('completed-tasks').textContent = completedTasks;
    }
  
    function updateProgress() {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      let studyTasks = tasks.filter(task => task.category === 'study' && task.completed).length;
      let fitnessTasks = tasks.filter(task => task.category === 'fitness' && task.completed).length;
  
      let totalStudyTasks = tasks.filter(task => task.category === 'study').length;
      let totalFitnessTasks = tasks.filter(task => task.category === 'fitness').length;
  
      let studyProgress = totalStudyTasks ? (studyTasks / totalStudyTasks) * 100 : 0;
      let fitnessProgress = totalFitnessTasks ? (fitnessTasks / totalFitnessTasks) * 100 : 0;
  
      // Display session counts from timers (actual workouts/study sessions)
      document.getElementById('study-sessions').textContent =
        localStorage.getItem('studySessions') || studyTasks;
  
      document.getElementById('fitness-sessions').textContent =
        localStorage.getItem('fitnessSessions') || fitnessTasks;
  
      // Update progress bars
      document.getElementById('study-progress-bar').style.width = studyProgress + '%';
      document.getElementById('fitness-progress-bar').style.width = fitnessProgress + '%';
    }

    function updateClock() {
        const now = new Date();
        document.getElementById("live-clock").textContent = now.toLocaleTimeString();
      }
      setInterval(updateClock, 1000);
      updateClock(); // run immediately
      
  
    updateTaskSummary();
    updateProgress();
  });
  
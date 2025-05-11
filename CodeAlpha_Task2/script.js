const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filterBtns = document.querySelectorAll(".filter-btn");
const tasksLeft = document.getElementById("tasks-left");
const clearCompletedBtn = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const showTasks = () => {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      updateTaskCounter();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t !== task);
      saveTasks();
      showTasks();
      updateTaskCounter();
    });

    taskItem.append(checkbox, taskText, deleteBtn);
    taskList.appendChild(taskItem);
  });
};

function updateTaskCounter() {
  const activeTasks = tasks.filter((task) => !task.completed).length;
  tasksLeft.textContent = `${activeTasks} ${
    activeTasks === 1 ? "task" : "tasks"
  } left`;
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({
      text: taskText,
      completed: false,
    });
    saveTasks();
    taskInput.value = "";
    showTasks();
    updateTaskCounter();
  }
}

// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initialize the app
showTasks();
updateTaskCounter();

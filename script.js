const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const calendarDate = document.getElementById("calendarDate");
const progressFill = document.getElementById("progressFill");

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];
let selectedDate = new Date().toISOString().split("T")[0];
calendarDate.value = selectedDate;

function renderTasks() {
  taskList.innerHTML = "";
  const filtered = tasks.filter(t => t.date === selectedDate);
  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.name} (${task.priority})</span>
      <div>
        <button onclick="toggleComplete(${index})">✅</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateProgress(filtered);
}

function toggleComplete(index) {
  const filtered = tasks.filter(t => t.date === selectedDate);
  const taskIndex = tasks.indexOf(filtered[index]);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  const filtered = tasks.filter(t => t.date === selectedDate);
  const taskIndex = tasks.indexOf(filtered[index]);
  tasks.splice(taskIndex, 1);
  saveTasks();
  renderTasks();
}

function updateProgress(filtered) {
  const total = filtered.length;
  const completed = filtered.filter(t => t.completed).length;
  const percent = total ? (completed / total) * 100 : 0;
  progressFill.style.width = `${percent}%`;
}

function saveTasks() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("taskName").value;
  const priority = document.getElementById("taskPriority").value;
  tasks.push({ name, priority, date: selectedDate, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
});

calendarDate.addEventListener("change", (e) => {
  selectedDate = e.target.value;
  renderTasks();
});

renderTasks();
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoBody = document.getElementById("todoBody");
const filterSelect = document.getElementById("filterSelect");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoBody.innerHTML = "";

  let filteredTodos = todos;
  if (filterSelect.value === "done") {
    filteredTodos = todos.filter(todo => todo.done);
  } else if (filterSelect.value === "pending") {
    filteredTodos = todos.filter(todo => !todo.done);
  }

  if (filteredTodos.length === 0) {
    todoBody.innerHTML = <tr><td colspan="4">No task found</td></tr>;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.classList.add("fade-in");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "â Done" : "â Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Delete</button>
        <button onclick="editTask(${index})">Edit</button>
      </td>
    `;
    todoBody.appendChild(row);
  });
}

function addTodo() {
  if (taskInput.value.trim() === "" || dateInput.value === "") {
    alert("Please enter task and date!");
    return;
  }
  todos.push({
    task: taskInput.value,
    date: dateInput.value,
    done: false
  });
  saveTodos();
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

function deleteTask(index) {
  const rows = todoBody.querySelectorAll("tr");
  if (rows[index]) {
    rows[index].classList.add("fade-out");
    setTimeout(() => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    }, 500);
  }
}

function editTask(index) {
  const newTask = prompt("Edit task:", todos[index].task);
  const newDate = prompt("Edit date (YYYY-MM-DD):", todos[index].date);
  if (newTask !== null && newTask.trim() !== "" && newDate !== null && newDate !== "") {
    todos[index].task = newTask;
    todos[index].date = newDate;
    saveTodos();
    renderTodos();
  }
}

function deleteAll() {
  todos = [];
  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
filterSelect.addEventListener("change", renderTodos);

const bgAudio = document.getElementById("bgAudio");
const playPauseBtn = document.getElementById("playPauseBtn");

playPauseBtn.addEventListener("click", () => {
  if (bgAudio.paused) {
    bgAudio.play();
    playPauseBtn.textContent = "â¸ï¸ Pause Music";
  } else {
    bgAudio.pause();
    playPauseBtn.textContent = "â¶ï¸ Play Music";
  }
});

renderTodos();

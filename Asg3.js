document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const errorDiv = document.getElementById("error");

  addTaskBtn.addEventListener("click", addTask);
  taskList.addEventListener("click", handleTaskClick);

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const li = document.createElement("li");
      const taskSpan = document.createElement("span");
      const editInput = document.createElement("input");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      taskSpan.textContent = taskText;
      editInput.type = "text";
      editInput.value = taskText;
      editInput.style.display = "none";
      editBtn.textContent = "Edit";
      deleteBtn.textContent = "Delete";

      li.appendChild(taskSpan);
      li.appendChild(editInput);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
      taskInput.value = "";
      errorDiv.textContent = "";

      editBtn.addEventListener("click", function() {
        taskSpan.style.display = "none";
        editInput.style.display = "inline-block";
        editInput.focus();
      });

      editInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          const newTaskText = editInput.value.trim();
          if (newTaskText !== "") {
            taskSpan.textContent = newTaskText;
            taskSpan.style.display = "inline-block";
            editInput.style.display = "none";
          } else {
            showError("Task cannot be empty");
          }
        }
      });

      deleteBtn.addEventListener("click", function() {
        taskList.removeChild(li);
      });
    } else {
      showError("Task cannot be empty");
    }
  }

  function handleTaskClick(event) {
    if (event.target.tagName === "LI" || event.target.tagName === "SPAN") {
      return;
    }

    const li = event.target.parentElement;
    if (event.target.textContent === "Delete") {
      taskList.removeChild(li);
    }
  }

  function showError(errorMessage) {
    errorDiv.textContent = errorMessage;
  }
});
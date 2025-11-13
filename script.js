// Run all logic after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // ------------ Local Storage helpers ------------

  // Save all current tasks (text only) to Local Storage
  function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li span').forEach(span => {
      tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from Local Storage when the page opens
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
  }

  // ------------ Core To-Do logic ------------

  // Create a task element and add it to the DOM
  function addTask(taskText, save = true) {
    const trimmedText = taskText.trim();

    if (trimmedText === '') {
      alert('Please enter a task');
      return;
    }

    const li = document.createElement('li');

    // Task text
    const span = document.createElement('span');
    span.textContent = trimmedText;

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // When remove is clicked: delete from DOM and update Local Storage
    removeButton.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasksToLocalStorage();
    });

    li.appendChild(span);
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Save new list to Local Storage (unless we're loading existing tasks)
    if (save) {
      saveTasksToLocalStorage();
    }
  }

  // Add task when button is clicked
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    addTask(taskText);
    taskInput.value = '';
  });

  // Add task when Enter key is pressed
  taskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      addButton.click();
    }
  });

  // Load any saved tasks when the page first loads
  loadTasks();
});

// Define UI variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Call funtion to load all event listeners
loadEventListners();

// Load all event listners
function loadEventListners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks events
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // Create li lelement
  const li = document.createElement('li');
  // Add a class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  });
}


// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  }

  // Create li lelement
  const li = document.createElement('li');
  // Add a class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = '';
  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    console.log(e.target);
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove();
      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    }
  }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem){
console.log(taskItem);
let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
 tasks.forEach(function(task, index){
   if(taskItem.textContent === task){
     tasks.splice(index, 1);
   }
 })
 localStorage.setItem('tasks',JSON.stringify(tasks));
} 

// Clear Tasks
function clearTasks(e) {
  // taskList.innerHTML='';
  //  faster way - loop through and remove child
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  e.preventDefault();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  });

}
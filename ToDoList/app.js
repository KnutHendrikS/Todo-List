// Define UI variables
const addButton = document.querySelector(".add");
const clearButton = document.querySelector(".clear");
const inputText = document.querySelector("input");
const todoContainer = document.querySelector(".content");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTodos);
    // Add a todo
    addButton.addEventListener("click", addTodo);
    // clear todos
    clearButton.addEventListener("click", clearTodos);
    // remove todo
    todoContainer.addEventListener("click", removeTodo);
}

// Get Todos from Local Storage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        // Create div element
        const todoElem = document.createElement("div");
        // Add class
        todoElem.classList.add("todo");
        // Create text node and append to todoElem
        todoElem.appendChild(document.createTextNode(todo));
        // Create new link element
        const removelink = document.createElement('a');
        // Add class
        removelink.classList.add("delete-item");
        // Add icon html
        removelink.innerHTML = '<i class="fa fa-remove"></i>';
        
        // Append the todoElem to todoContainer
        todoContainer.appendChild(todoElem);
        // Append the link to li
        todoElem.appendChild(removelink);
    });
}

// Store Todo
function storeTodoInLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add Todo
function addTodo(e){
    if(inputText.value === '') {
        alert('Add a todo');
        return;
    }

    // Create div element
    const todoElem = document.createElement("div");
    // Add class
    todoElem.classList.add("todo");
    // Create text node and append to li
    todoElem.appendChild(document.createTextNode(inputText.value));
    // Create new link element
    const removelink = document.createElement('a');
    // Add class
    removelink.classList.add("delete-item");
    // Add icon html
    removelink.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append the todoElem to todoContainer
    todoContainer.appendChild(todoElem);
    // Append the link to li
    todoElem.appendChild(removelink);

    // Store in local storage
    storeTodoInLocalStorage(inputText.value);

    // Clear input
    inputText.value = '';
}

// Clear Todos
function clearTodos() {
    while(todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }

    //Clear from local storage
    clearTodosFromLocalStorage();
}

// Clear Todos from local storage
function clearTodosFromLocalStorage(){
    localStorage.clear();
}

// Remove Todo
function removeTodo(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure you want to delete this todo?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from local storage
            removeTodoFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTodoFromLocalStorage(todoItem){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo, index){
        if(todoItem.textContent === todo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateClock() {
    const now = new Date(); // current date
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const time = now.getHours() + ':' + now.getMinutes();

    // a cleaner way than string concatenation
    const date = [now.getDate(), months[now.getMonth()], now.getFullYear()].join('.');

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = [date, time].join('<br>');

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); // initial call

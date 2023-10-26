// Selectors
const todoInputs = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listener
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo); 

//Functions
function addTodo(event) {
  //prevent  form from submittig
  event.preventDefault();
  // creating TODO DIV
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //CREATING LI INSIDE THE DIV
  let newTodo = document.createElement("li");
  newTodo.innerText = todoInputs.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); // the newTodo will be appended inside the todoDiv
  // ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInputs.value)
  //CHECK BUTTON
  let completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class=" fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // TRASH BUTTON
  //Check mark button
  let trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class=" fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // APPENDING THE TODO DIV INSIDE THE TODO LIST
  todoList.appendChild(todoDiv);
  // CLEAR THE INPUT EVERY TIME WE CLICK THE TODO BUTTON
  todoInputs.value = "";
}

// FUNCTION DELETECHECK
function deleteCheck(e) {
  const item = e.target;
  //DELETE THE TODOLIST
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; // WE CREATE A VARIABLE HERE TO SET GIVE THE VALUE OF THE PARENT ELEMENT OF ITEM
    // ADDING ANIMATION
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// filtering the  the todos
//  switch is controll flow statement that simplify the decision making in your code
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (
      e.target.value // i use eventlistener to target what we click nad and the value inside it
    ) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//function to save in local storage
function saveLocalTodos(todo) {
  //check if we all ready have any thing inside our localstorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    // if we dont have todos in our localStorage then
    todos = []; //we will create a empty array
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // if we have an array now
  }
  todos.push(todo); // we will  push a new todo to the todos
  localStorage.setItem("todos", JSON.stringify(todos)); // and set it back to the local storage
}


function getTodos() {
  let todos;
   if (localStorage.getItem("todos") === null) {
     todos = [];
   } else {
     todos = JSON.parse(localStorage.getItem("todos")); // if we have an array now
  }
  todos.forEach(function (todo) {
    // creating TODO DIV
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //CREATING LI INSIDE THE DIV
    let newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); // the newTodo will be appended inside the todoDiv
    //CHECK BUTTON
    let completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class=" fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // TRASH BUTTON
    //Check mark button
    let trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class=" fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPENDING THE TODO DIV INSIDE THE TODO LIST
    todoList.appendChild(todoDiv);
  });
    
  
}


function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // if we have an array now
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
} 
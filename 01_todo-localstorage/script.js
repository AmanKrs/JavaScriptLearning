//creating DOMContentLoaded event listener to verify the dom is loaded and then my function will start work

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTodoTask = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = [];

  if (localStorage.getItem("todoToken") !== null) {
    const taskList = localStorage.getItem("todoToken");
    tasks = JSON.parse(taskList);
    // console.log(tasks);
  }
  console.log(tasks);

  tasks.map((elem) => {
    // console.log(elem);
    renderTodoTask(elem);
  });
  addTodoTask.addEventListener("click", () => {
    const todoTaskValue = todoInput.value.trim();

    //checking if input is empty or not
    if (todoTaskValue === "") {
      return;
    }
    //creating object for todo task
    const newTodoTask = {
      id: Date.now(),
      task: todoTaskValue,
      isCompleted: false,
    };

    tasks.push(newTodoTask);
    saveTask();
    todoInput.value = ""; //clearing input value
    renderTodoTask(newTodoTask);
  });

  function renderTodoTask(taskcreated) {
    console.log(taskcreated);
    let newTodo = document.createElement("li");
    newTodo.textContent = taskcreated.task;
    let delbtn = document.createElement("button");
    delbtn.textContent = "Delete";
    newTodo.appendChild(delbtn);
    todoList.appendChild(newTodo);
  }
 
  function saveTask() {
    localStorage.setItem("todoToken", JSON.stringify(tasks));
  }


});

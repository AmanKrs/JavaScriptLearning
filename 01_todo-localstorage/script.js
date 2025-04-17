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

  //rendering all the task present in the local storage

  tasks.map((elem) => {
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
      text: todoTaskValue,
      isCompleted: false,
    };

    tasks.push(newTodoTask);
    saveTask(); // setting up local storage
    todoInput.value = ""; //clearing input value
    renderTodoTask(newTodoTask); // rendering new task
  });

  //creating function for rendering the tasks on dom
  function renderTodoTask(taskcreated) {
    //creating new li elements
    let newTodo = document.createElement("li");
    //setting up some ids to li
    newTodo.setAttribute("data-id", taskcreated.id);
    //setting class name if task is completed
    if (taskcreated.isCompleted) {
      newTodo.classList.add("completed");
    }
    //adding list content with span & button
    newTodo.innerHTML = `<span>${taskcreated.text}</span> <button>Delete</button>`;

    //adding event on clicking the list item but not on button
    newTodo.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        return;
      }
      taskcreated.isCompleted = !taskcreated.isCompleted;
      newTodo.classList.toggle("completed"); // toggling classname to having toggle style
      saveTask(); // setting up local storage
    });

    //adding event to only button inside the list element(here newTodo)
    newTodo.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //stopping to bubble-up to the parents

      //filtering out the clicked item
      tasks = tasks.filter((elem) => elem.id !== taskcreated.id);
      newTodo.remove(); //removing from the list content
      saveTask(); // setting up local storage
    });
    //adding all the list tasked to rendering ul element
    todoList.appendChild(newTodo);
  }

  //function for setting local storage with task list
  function saveTask() {
    localStorage.setItem("todoToken", JSON.stringify(tasks));
  }
});

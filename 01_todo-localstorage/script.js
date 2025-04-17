const todoInput = document.getElementById("todo-input");
const addTodoTask = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = [];

addTodoTask.addEventListener("click", () => {
  const todoTask = todoInput.value.trim();
  if (todoTask === "") {
    return;
  } else {
    let newTodo = document.createElement("li");
    newTodo.textContent = todoTask;
    let delbtn = document.createElement("button");
    delbtn.textContent = "Delete";
    newTodo.appendChild(delbtn);
    todoList.appendChild(newTodo);

    delbtn.addEventListener("click", ()=>{
      console.log(this)
    })

  }
});

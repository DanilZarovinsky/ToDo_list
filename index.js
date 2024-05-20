const taskList = document.querySelector(".task-list");
const addTaskButton = document.querySelector(".buton-task-add");

function loadTask() {
  const taskСatalog = JSON.parse(localStorage.getItem("index"));
  const ToDelete = "";
  if (taskСatalog === null) {
    return "";
  }
  const filteredTasks2 = taskСatalog.filter((task) => task.value !== ToDelete);
  localStorage.clear();
  localStorage.setItem("index", JSON.stringify(filteredTasks2));
}

console.log(JSON.parse(localStorage.getItem("index")));

loadTask();

function timeNow() {
  const now = new Date();
  const time = document.querySelector(".time-now");
  time.textContent = now.toLocaleString();
}
timeNow();
setInterval(() => {
  timeNow();
}, 1000);

function deleteTask(event) {
  const task = event.target.closest(".task-item");
  const taskText = task.querySelector(".task-item-text").textContent;

  const taskList2 = JSON.parse(localStorage.getItem("index"));
  const filteredTask = taskList2.filter(
    (element) => element.value !== taskText
  );
  localStorage.clear();
  localStorage.setItem("index", JSON.stringify(filteredTask));

  let start = Date.now();

  let timer = setInterval(function () {
    let timePassed = Date.now() - start;

    if (timePassed >= 380) {
      clearInterval(timer);
      task.remove();
      return;
    }

    draw(timePassed);
  }, 20);

  function draw(timePassed) {
    const filteredTask = taskList2.filter(
      (element) => element.value === taskText
    );
    filteredTask.forEach((elm) => {
      if (elm.status) {
        task.setAttribute("style", `opacity:${1 - timePassed / 400}`);
      } else {
        task.setAttribute("style", `opacity:${1 - timePassed / 400}`);
      }
    });
  }
}

function completeTask(event) {
  const task = event.target.closest(".task-item");
  const taskText = task.querySelector(".task-item-text");
  taskText.classList.toggle("complete");
  let taskСatalog = JSON.parse(localStorage.getItem("index"));
  taskСatalog.map((elm) => {
    if (elm.value === taskText.textContent) {
      if (elm.status === false) {
        elm.status = true;
      } else elm.status = false;
    } else {
      if (elm.status === false) {
        elm.status = false;
      } else elm.status = true;
    }
  });
  localStorage.clear();
  localStorage.setItem("index", JSON.stringify(taskСatalog));
}
const inputValue = document.querySelector(".input-task");
function addTask() {
  const taskTemplate = document.querySelector("#task-templete").content;
  const taskElm = taskTemplate.querySelector(".task-item").cloneNode(true);
  const completeButton = taskElm.querySelector(".button-completed");
  const deleteButton = taskElm.querySelector(".button-delete");
  const taskText = taskElm.querySelector(".task-item-text");
  taskText.textContent = inputValue.value;
  if (taskText.textContent) {
    taskList.prepend(taskElm);
    inputValue.value = "";
  } else {
    alert("Введите текст");
  }
  deleteButton.addEventListener("click", deleteTask);
  completeButton.addEventListener("click", completeTask);
  if (JSON.parse(localStorage.getItem("index"))) {
    let taskСatalog = JSON.parse(localStorage.getItem("index"));
    taskСatalog.push({ value: taskText.textContent, status: false });
    localStorage.setItem("index", JSON.stringify(taskСatalog));
  } else {
    taskСatalog = [];

    taskСatalog.push({ value: taskText.textContent, status: false });
    localStorage.setItem("index", JSON.stringify(taskСatalog));
  }

  let start = Date.now();

  let timer = setInterval(function () {
    let timePassed = Date.now() - start;

    if (timePassed >= 1000) {
      clearInterval(timer);
      return;
    }

    draw(timePassed);
  }, 20);

  function draw(timePassed) {
    taskElm.setAttribute("style", `opacity:${timePassed / 700}`);
  }
}

document.addEventListener("keyup", (event) => {
  if (event.code === "Enter") addTask();
});
addTaskButton.addEventListener("click", () => addTask());

if (JSON.parse(localStorage.getItem("index"))) {
  const taskList2 = JSON.parse(localStorage.getItem("index"));
  taskList2.forEach((element) => {
    addLaskTask(element);
  });
}

function addLaskTask(elm) {
  const taskTemplate = document.querySelector("#task-templete").content;
  const taskElm = taskTemplate.querySelector(".task-item").cloneNode(true);
  const completeButton = taskElm.querySelector(".button-completed");
  const deleteButton = taskElm.querySelector(".button-delete");
  const taskText = taskElm.querySelector(".task-item-text");
  taskText.textContent = elm.value;
  if (elm.status === true) {
    taskText.classList.add("complete");
    taskElm.classList.toggle("task-complete");
  }
  taskList.prepend(taskElm);

  deleteButton.addEventListener("click", deleteTask);
  completeButton.addEventListener("click", completeTask);
}

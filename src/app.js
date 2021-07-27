function Task(data){
    this.id = uuidv4()
    this.data = data;
    this.isCompleted = false;
    this.createdAt = Date.now();
    
}

let tasks = [];

let taskInput = document.getElementById('task');
let taskList = document.getElementById('task-list');

const addToDom = (task) =>{
    let taskDiv = document.createElement('div');
    taskDiv.id = task.id;
    let isCompletedBox = document.createElement('input');
    isCompletedBox.type = 'checkbox';
    isCompletedBox.addEventListener('change', isCompeletedTask);
    let taskData = document.createElement('p');
    let taskLog = document.createElement('p');
    let deleteBtn = document.createElement('input');
    deleteBtn.id = task.id;
    deleteBtn.value = 'Delete'
    deleteBtn.type = 'button';
    deleteBtn.innerText = 'Delete Task'
    deleteBtn.addEventListener('click', deleteTask);

    taskData.innerText = task.data;
    taskLog.innerText = task.createdAt;

    taskDiv.appendChild(isCompletedBox);
    taskDiv.appendChild(taskData);
    taskDiv.appendChild(taskLog);
    taskDiv.appendChild(deleteBtn);
    taskList.appendChild(taskDiv);
}

const addTask = (event) =>{
    event.preventDefault();
    console.log(event)
    let task = new Task(taskInput.value);
    tasks.push(task);
    addToDom(task);
    addToLocalStorage(tasks);
    console.log(tasks);
}

const deleteTask = (event) =>{
    console.log('delete button pressed', event.target.id);
    tasks = tasks.filter((item) => {
        return item.id != event.target.id
    })
    document.getElementById(event.target.id).remove();
    addToLocalStorage(tasks);
}

const isCompeletedTask = (event) =>{
    console.log(event.target.parentElement.id);
    tasks.forEach((item) => {
        if(item.id == event.target.parentElement.id){
            item.isCompleted = !item.isCompleted;
        }
    })
    event.target.parentElement.style = 'text-decoration: line-through'
    addToLocalStorage(tasks);
}

const addToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getFromLocalStorage = () => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task)=>{
        addToDom(task);
    })
}

getFromLocalStorage();
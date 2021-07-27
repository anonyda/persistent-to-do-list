function Task(data){
    this.id = uuidv4()
    this.data = data;
    this.isCompleted = false;
    this.createdAt = Date.now();
    
}

let tasks = JSON.parse(localStorage.getItem('tasks'));

let taskInput = document.getElementById('task');
let taskList = document.getElementById('task-list');

const addToDom = (task) =>{
    let taskDiv = document.createElement('div');
    taskDiv.id = task.id;
    taskDiv.classList.add('task');
    let isCompletedBox = document.createElement('input');
    isCompletedBox.type = 'checkbox';
    isCompletedBox.classList.add('checkbox');
    isCompletedBox.addEventListener('change', isCompeletedTask);
    let taskData = document.createElement('p');
    if(task.isCompleted){
        taskData.classList.add('checked');
        isCompletedBox.checked = true;
    }
    let taskLog = document.createElement('p');
    let deleteBtn = document.createElement('input');
    deleteBtn.id = task.id;
    deleteBtn.value = 'Delete'
    deleteBtn.type = 'button';
    deleteBtn.innerText = 'Delete Task';
    deleteBtn.classList.add('deleteBtn', 'button');
    deleteBtn.addEventListener('click', deleteTask);

    taskData.innerText = task.data;
    taskLog.innerText = task.createdAt;

    taskDiv.appendChild(isCompletedBox);
    taskDiv.appendChild(taskData);
    // taskDiv.appendChild(taskLog);
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
    taskInput.value = "";
}

const resetInput = () => {
    taskInput.value = "";
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
            item.isCompleted ? event.target.nextElementSibling.classList.add('checked') : event.target.nextElementSibling.classList.remove('checked')
        } 
    })
    addToLocalStorage(tasks);
}

const addToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getFromLocalStorage = (tasks) => {
    tasks.forEach((task)=>{
        addToDom(task);
    })
}

getFromLocalStorage(tasks);
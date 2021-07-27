function Task(data){
    this.id = uuidv4()
    this.data = data;
    this.isCompleted = false;
    this.createdAt = new Date();
    
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
    let taskData = document.createElement('input');

    taskData.disabled = true;
    taskData.style.border = 'none';
    taskData.classList.add('task')

    if(task.isCompleted){
        taskData.classList.add('checked');
        isCompletedBox.checked = true;
    }

    let taskLog = document.createElement('p');

    let updateCheck = document.createElement('i');
    updateCheck.classList.add('deleteBtn', 'fas', 'fa-check');
    updateCheck.style.display = 'none';
    updateCheck.addEventListener('click', updateTaskContent);

    let updateBtn = document.createElement('i');
    updateBtn.id = task.id;
    updateBtn.classList.add('fas', 'fa-edit', 'deleteBtn');
    updateBtn.addEventListener('click', updateTask);

    let deleteBtn = document.createElement('i');
    deleteBtn.id = task.id;
    deleteBtn.classList.add('deleteBtn', 'fas', 'fa-trash');
    deleteBtn.addEventListener('click', deleteTask);

    // taskData.innerText = task.data;
    taskData.value = task.data;
    taskLog.innerText = task.createdAt;

    taskDiv.appendChild(isCompletedBox);
    taskDiv.appendChild(taskData);
    taskDiv.appendChild(updateBtn);
    taskDiv.appendChild(updateCheck);
    // taskDiv.appendChild(taskLog);
    taskDiv.appendChild(deleteBtn);
    taskList.appendChild(taskDiv);
}

const addTask = (event) =>{
    event.preventDefault();
    // console.log(event)
    let task = new Task(taskInput.value);
    tasks.push(task);
    addToDom(task);
    addToLocalStorage(tasks);
    // console.log(tasks);
    taskInput.value = "";
}

const resetInput = () => {
    taskInput.value = "";
}

const updateTask = (event) =>{
    tasks.forEach((task)=>{
        if(task.id == event.target.id){
            if(!task.isCompleted){
                event.target.parentNode.childNodes.forEach((item) => {
                    if(item.classList.contains('task')){
                        event.target.style.display = 'none';
                        event.target.nextElementSibling.style.display = 'unset';
                        item.disabled = false;
                    }
                })
            }else{
                alert("Task is already completed! Can't edit :(")
            }
        }

    })
    
}

const updateTaskContent = (event) => {
    event.target.parentNode.childNodes.forEach((item) => {
        if(item.classList.contains('task')){
            tasks.forEach((task) => {
                if(task.id == event.target.nextElementSibling.id){
                    task.data = item.value;
                    event.target.style.display = 'none';
                    event.target.previousElementSibling.style.display = 'unset';
                    item.disabled=true;
                }
            })
        }
    })
    addToLocalStorage(tasks);
}

const deleteTask = (event) =>{
    // console.log('delete button pressed', event.target.id);
    tasks = tasks.filter((item) => {
        return item.id != event.target.id
    })
    document.getElementById(event.target.id).remove();
    addToLocalStorage(tasks);
}

const isCompeletedTask = (event) =>{
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

if (localStorage.getItem('tasks') !== null){
    getFromLocalStorage(tasks);
}
   
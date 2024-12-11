const inputField = document.getElementById("todo-input")
const addButton = document.getElementById("add-task-btn")
const itemList = document.getElementById("todo-list")

//creating array for adding task
let tasks = [] 


//retrieve tasks data from local storage and converting to array to array when the window is load
window.addEventListener("load", () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))
    console.log(tasksFromLocalStorage)
    if (tasksFromLocalStorage) {
        tasks = tasksFromLocalStorage
        tasks.forEach(task => {
            renderTask(task)
        });

    }
})

//for adding the new Task
addButton.addEventListener("click", () => {
    const todoText = inputField.value.trim()
    if (todoText === "") return;

    const task = {
        id: Date.now(),
        text: todoText,
        isCompleted: false
    }

    tasks.push(task)
    renderTask(task)
    saveTask(tasks)
    console.log(tasks)
    inputField.value = ""
})



//for rendering each tasks 
function renderTask(task) {
    const listItem = document.createElement("li")
    listItem.textContent = task.text
    itemList.appendChild(listItem)

    if (task.isCompleted) {
        listItem.classList.add("completed")
    }

    const divContainer = document.createElement("div")
    divContainer.classList.add("task-buttons")
    listItem.appendChild(divContainer)

    const completeBtn = document.createElement("button")
    completeBtn.textContent = "Complete"
    completeBtn.classList.add("complete-btn")
    divContainer.appendChild(completeBtn)

    completeBtn.addEventListener("click", () => {
        completeTask(task.id)
        listItem.classList.add("completed")
    })



    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete-btn")
    divContainer.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", () => {
        deleteTask(task.id)
        listItem.style.display = "none"
    })

}

//deleting any completed task
function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id)
    tasks = newTasks
    saveTask(tasks)
    console.log(tasks)
}



// marking the task as complted
function completeTask(id) {
    let task = tasks.find((task) => task.id === id) //used find to modify parant array
    if (task) {
        task.isCompleted = !(task.isCompleted)
        saveTask(tasks)
    }
}

//adding To local storage
function saveTask(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}



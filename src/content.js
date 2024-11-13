import { Task } from "./todos";

function contentLoad(){
    //for preload, call createTaskElements with pre-existing tasks
    //will need to figure that out later

    const modal = document.querySelector('#task-form')
    const submit = document.querySelector('#submit')
    submit.addEventListener('click', ()=>{
        let newTask = addTask()
        createTaskElements(newTask)
        modal.close()
    })
}

function createTaskElements(newTask){
    //Content elements
    const content = document.querySelector('#content')
    const taskCard = document.createElement('div')
    taskCard.classList.add('task-card')
    const taskInfo = document.createElement('div')
    taskInfo.classList.add('task-info')
    const descriptionBox = document.createElement('div')
    descriptionBox.classList.add('task-description')

    //task elements
    const infoName = document.createElement('span')
    infoName.textContent = newTask.name
    const infoDate = document.createElement('span')
    infoDate.textContent = newTask.dueDate
    const infoDescription = document.createElement('span')
    infoDescription.textContent = newTask.description

    taskInfo.appendChild(infoName)
    taskInfo.appendChild(infoDate)
    descriptionBox.appendChild(infoDescription)
    taskCard.appendChild(taskInfo)
    taskCard.appendChild(descriptionBox)
    content.appendChild(taskCard)   
}

function addTask(){
    //form elements
    const taskName = document.querySelector('#task_name')
    const dueDate = document.querySelector('#due_date')
    const taskDescription = document.querySelector('#task_description')

    //create task
    let name = taskName.value
    let date = dueDate.value
    let description = taskDescription.value
    const task = new Task(name, date, description)
    console.log(task)

    return task
}


export {contentLoad}
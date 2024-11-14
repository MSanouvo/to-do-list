import { Task } from "./todos";

function contentLoad(project){
    //load a given group of tasks
    loadProject(project)

    //form functionality
    openForm()
    submitTask()
}

function loadProject(project){
    let tasks = project.array.length
    const content = document.querySelector('#content')
    const title = document.createElement('span')
    title.classList.add('group-header')
    title.textContent = project.name
    content.appendChild(title)

    for(let i = 0; i<tasks; i++){
        createTaskElements(project.array[i])
    }
}

function openForm(){
    const taskForm = document.querySelector('#task-form')
    const modalButton = document.querySelector('#open-modal')
    modalButton.addEventListener('click', ()=>{
        taskForm.showModal()
    })
    
    taskForm.addEventListener('click', (e)=>{
        if (e.target === taskForm ){
            taskForm.close()
        }
    })
}

//creates DOM content using form input
//need to also add tasks to their selected groups
function submitTask(){
    const modal = document.querySelector('#task-form')
    const submit = document.querySelector('#submit')
    
    const selectOption = document.querySelector('#task_group')
    submit.addEventListener('click', ()=>{
        let newTask = addTask()
        createTaskElements(newTask)
        //project option
        console.log(selectOption.value)
        modal.close()
    })
}

//function used to create DOM elements for content
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

//creates task from form inputs
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
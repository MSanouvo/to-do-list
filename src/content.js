import { Task } from "./todos";
import { list } from ".";
import { Project } from "./project";
import { loadNavList } from "./navbar-list";

//Module for loading and creating new content

function contentLoad(project){
    //load a given group of tasks
    loadProject(project)
    //form functionality
    openTaskForm()
    openProjectForm()
}

function loadProject(project){
    let tasks = project.array.length
    const content = document.querySelector('#content')
    resetContent(content)//reset DOM before adding elements
    const title = document.createElement('span')
    title.classList.add('group-header')
    title.textContent = project.name
    content.appendChild(title)
    //add each task to our content div
    for(let i = 0; i<tasks; i++){
        createTaskElements(project.array[i])
    }
}

function resetContent(content){
    while(content.firstChild){
        content.removeChild(content.lastChild)
    }
}

function openTaskForm(){
    const taskForm = document.querySelector('#task-form')
    const modalButton = document.querySelector('#open-task-modal')
    modalButton.addEventListener('click', ()=>{
        taskForm.showModal()
    })
    
    taskForm.addEventListener('click', (e)=>{
        if (e.target === taskForm ){
            taskForm.close()
        }
    })
}

function openProjectForm(){
    const projectForm = document.querySelector('#project-form')
    const modalButton = document.querySelector('#open-project-modal')
    modalButton.addEventListener('click', ()=>{
        projectForm.showModal()
    })

    projectForm.addEventListener('click', (e)=>{
        if(e.target === projectForm){
            projectForm.close()
        }
    })
}


//creates DOM content using form input
//need to also add tasks to their selected groups
function submitTask(){
    const taskModal = document.querySelector('#task-form')
    const submit = document.querySelector('#submit_task')
    
    const selectOption = document.querySelector('#task_group')
    submit.addEventListener('click', ()=>{
        //create task, add it to specific project
        let newTask = addTask()
        list.addTasktoProject(selectOption.value, newTask)
        //console.log(list.getProjects())
        taskModal.close()
    })
}

function submitProject(){
    const projectModal = document.querySelector('#project-form')
    const submit = document.querySelector('#submit_project')
    const projectGroupList = document.querySelector('#group-list')
    const taskGroupOptions = document.querySelector('#task_group')

    submit.addEventListener('click', ()=>{
        createProject()
        //reset these because loadNavList is going to append over them
        resetContent(projectGroupList)
        resetContent(taskGroupOptions)
        loadNavList(list)
        projectModal.close()
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
    taskInfo.value = 1
    const descriptionBox = document.createElement('div')
    descriptionBox.classList.add('task-description')

    //task elements
    const taskName = document.createElement('span')
    taskName.textContent = newTask.name
    const taskDate = document.createElement('span')
    taskDate.textContent = newTask.dueDate
    const taskDescription = document.createElement('span')
    taskDescription.textContent = newTask.description
    const taskPriority = document.createElement('span')
    taskPriority.textContent = 'Priority: ' + newTask.priority

    //for our task completion
    const completion = document.createElement('div')
    completion.classList.add('completion')
    const taskComplete = document.createElement('span')
    taskComplete.textContent = newTask.checkCompletion()
    const completedButton = document.createElement('input')
    completedButton.setAttribute('type', 'checkbox')
    completion.appendChild(completedButton)
    completion.appendChild(taskComplete)

    taskInfo.appendChild(taskName)
    taskInfo.appendChild(taskDate)
    taskInfo.appendChild(taskPriority)
    taskInfo.appendChild(completion)
    descriptionBox.appendChild(taskDescription)
    taskCard.appendChild(taskInfo)
    taskCard.appendChild(descriptionBox)
    content.appendChild(taskCard)  
    
    //code for displaying/removing description 
    //(may be useful for a description dropdown feature)
    // taskInfo.addEventListener('click', (e)=>{
    //     console.log(e.target)
    //     if(e.target.value === 1){
    //         taskCard.removeChild(descriptionBox)
    //         e.target.value = 0
    //     } else{
    //         taskCard.appendChild(descriptionBox)
    //         e.target.value = 1
    //     }
    // })
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
    
    //IMPORTANT
    return task
}

function createProject(){
    const projectName = document.querySelector('#project_name')

    let name = projectName.value
    const project = new Project(name)
    list.addProjectToArray(project)
    console.log(list.getProjects())
}

export {contentLoad, loadProject, submitTask, submitProject}
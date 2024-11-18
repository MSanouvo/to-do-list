import { Task, updateTask, sortTasks } from "./todos";
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
    console.log(localStorage.length)
}

function loadProject(project){
    let tasks = project.array.length
    const content = document.querySelector('#content')
    resetContent(content)//reset DOM before adding elements
    const title = document.createElement('span')
    title.classList.add('group-header')
    title.textContent = project.name
    title.setAttribute('id', project.name)
    
    content.appendChild(title)
    addSortList(content, project)

    //add each task to our content div
    for(let i = 0; i<tasks; i++){
        createTaskElements(project.array[i], i)
    }
}

function addSortList(parent, project){
    const sortDiv = document.createElement('div')
    sortDiv.classList.add('sort')
    const sortLable = document.createElement('lable')
    sortLable.textContent = 'sort: '
    const sort = document.createElement('select')
    sort.setAttribute('name', 'sort')
    sort.setAttribute('id', 'sort-button')
    //options
    const sortRecent = document.createElement('option')
    sortRecent.textContent = 'by Recent'
    const sortOldest = document.createElement('option')
    sortOldest.textContent = 'by Oldest'
    const sortName = document.createElement('option')
    sortName.textContent = 'by Name'
    const sortPriorty = document.createElement('option')
    sortPriorty.textContent = 'by Priorty'
    const sortDate = document.createElement('option')
    sortDate.textContent = 'by Date'

    //sort options
    sort.appendChild(sortOldest)
    sort.appendChild(sortRecent)
    sort.appendChild(sortName)
    sort.appendChild(sortPriorty)

    //load content
    parent.appendChild(sortDiv)
    sortDiv.appendChild(sortLable)
    sortDiv.appendChild(sort)

    //figure out sorting features later
    // //for sorting functions
    // let sortedProject = sortTasks(project)
    // sortRecent.addEventListener('click', ()=>{
    //     sortedProject.recentArray()
    //     console.log(project)
    // })
    // sortOldest.addEventListener('click', ()=>{
    //     // sortedProject.recentArray()
    //     // console.log(project)
    // })
    // sortName.addEventListener('click', ()=>{
    //     sortedProject.sortedName()
    //     console.log(project)
    // })
    // sortPriorty.addEventListener('click', ()=>{
    //     sortedProject.sortPriorty
    //     console.log(project)
    // })
    // sortDate
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

function openEditForm(button, task){
    const editForm = document.querySelector('#edit-task-form')
    const taskName = document.querySelector('#edit_name')
    const taskDate = document.querySelector('#edit_date')
    const taskDescription = document.querySelector('#edit_description')
    

    button.addEventListener('click', ()=>{
        editForm.showModal()
        console.log(task)
        taskName.value = task.name
        taskDate.value = task.dueDate
        taskDescription.value = task.description
        editTask(task)
    })

    editForm.addEventListener('click', (e)=>{
        if(e.target === editForm){
            editForm.close()
        }
    })
}

function editTask(task){
    const editName = document.querySelector('#edit_name')
    const editDate = document.querySelector('#edit_date')
    const editDescription = document.querySelector('#edit_description')
    const modal = document.querySelector('#edit-task-form')
    const submit = document.querySelector('#submit-edit')

    submit.addEventListener('click', ()=>{
        let taskEdit = updateTask(task)
        taskEdit.changeName(editName.value)
        taskEdit.changeDueDate(editDate.value)
        taskEdit.changeDescription(editDescription.value)
        console.log(task)
        modal.close()
    },{once:true})
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
function createTaskElements(newTask, index){
    console.log("is Task Class? " + (newTask instanceof Task)) //Check if new tasks are actual task objects
    //Content elements
    const content = document.querySelector('#content')
    const taskCard = document.createElement('div')
    taskCard.classList.add('task-card')
    taskCard.setAttribute('data-index-number', index)
    console.log(taskCard.dataset.indexNumber)
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
    if(newTask.completed === true){
        completedButton.checked = true
    }else{
        completedButton.checked = false
    }
    completedButton.setAttribute('type', 'checkbox')
    completedButton.setAttribute('name', 'complete-button')
    completion.appendChild(completedButton)
    completion.appendChild(taskComplete)

    //edit and remove buttons
    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('task-buttons')
    const edit = document.createElement('button')
    edit.textContent = "Edit Task"
    edit.classList.add('buttons')
    edit.setAttribute('id', 'edit')
    const remove = document.createElement('button')
    remove.textContent = 'Remove Task'
    remove.classList.add('buttons')
    remove.setAttribute('id', 'remove')


    taskInfo.appendChild(taskName)
    taskInfo.appendChild(taskDate)
    taskInfo.appendChild(taskPriority)
    taskInfo.appendChild(completion)
    taskInfo.appendChild(buttonDiv)
    buttonDiv.appendChild(edit)
    buttonDiv.appendChild(remove)
    descriptionBox.appendChild(taskDescription)
    taskCard.appendChild(taskInfo)
    taskCard.appendChild(descriptionBox)
    content.appendChild(taskCard) 
    
    markComplete(completedButton, newTask)
    openEditForm(edit, newTask)
    removeTask(remove, index)

    
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

function removeTask(button, index){
    button.addEventListener('click', ()=>{
        console.log(index)
        //take out index from project array and reload content
        //need to figure out how to get the project to call content load
    })
}

function markComplete(button, task){
    let completionUpdate = updateTask(task)
    button.addEventListener('click', ()=>{
        console.log(task)
        if(task.completed === false){
            completionUpdate.isComplete()
            console.log(task)
            button.checked = true
        }else{
            completionUpdate.isIncomplete()
            console.log(task)
            button.checked = false
        }
    })
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
    //task.saveTask()
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
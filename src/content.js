import { Task, updateTask, sortTasks } from "./todos";
import { list } from ".";
import { Project } from "./project";
import { loadNavList } from "./navbar-list";

//Module for loading and creating new content

function contentLoad(project, array){
    //load a given group of tasks
    loadProject(project)
    //console.log(array)
    if(array != undefined){
        generateTaskCard(project, array)
    }
    //form functionality
    openTaskForm()
    openProjectForm()
}

function loadProject(project){
    //Adds Header of Project, and functions associated to this
    //specific project (rename, delete, sort, etc.)

    const content = document.querySelector('#content')
    resetContent(content)//reset DOM before adding elements
    const titleDiv = document.createElement('div')
    titleDiv.classList.add('header-div')
    const title = document.createElement('span')
    title.classList.add('group-header')
    title.textContent = project.name
    title.setAttribute('id', project.name)
    const projectButtons = document.createElement('div')
    projectButtons.classList.add('header-buttons')
    const renameTitle = document.createElement('button')
    renameTitle.textContent = 'Rename Project'
    const deleteProject = document.createElement('button')
    deleteProject.setAttribute('id', 'delete')
    deleteProject.textContent = "Delete Project"
    
    
    content.appendChild(titleDiv)
    titleDiv.appendChild(title)
    titleDiv.appendChild(projectButtons)
    if(project.name != 'General'){
        projectButtons.appendChild(renameTitle)
        projectButtons.appendChild(deleteProject)
    }
    addSortList(content, project)

    //Remove Dialog for task
    const confirmationModal = document.querySelector('#remove-confirmation')
    const confirmationButtons = document.querySelector('#remove-buttons')
    removeItemMessage(project.name)
    let switchOn = null

    openProjectEdit(renameTitle, project)

    //Events for deleting project
    deleteProject.addEventListener('click', ()=>{
        console.log('buzz')
        switchOn = project.value
        console.log(switchOn)
        confirmationModal.showModal()
    })

    confirmationButtons.addEventListener('click', (event)=>{
        let target = event.target
        if(switchOn != null){
            switch(target.id){
                case 'yes':
                    console.log('zzz')
                    list.removeProject(project)
                    confirmationModal.close()
                    loadNavList(list)
                    switchOn = null
                    break
                case 'no':
                    confirmationModal.close()
                    switchOn = null
                    break
            } 
        }      
    })
}

function generateTaskCard(project, array){
    let tasks = array.length
    for(let i = 0; i<tasks; i++){
        createTaskElements(array[i], i, project)
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
    sortRecent.setAttribute('id', 'recent')
    sortRecent.value = "Recent"
    const sortOldest = document.createElement('option')
    sortOldest.textContent = 'by Oldest'
    sortOldest.setAttribute('id', 'oldest')
    sortOldest.value = 'Oldest'
    const sortName = document.createElement('option')
    sortName.textContent = 'by Name'
    sortName.setAttribute('id', 'by_name')
    sortName.value = "Name"
    const sortPriority = document.createElement('option')
    sortPriority.textContent = 'by Priorty'
    sortPriority.setAttribute('id', 'by_priority')
    sortPriority.value = "Priority"
    const sortDate = document.createElement('option')
    sortDate.textContent = 'by Date'
    sortDate.setAttribute('id', 'by_date')
    sortDate.value = 'Date'
    const sortIncompleted = document.createElement('option')
    sortIncompleted.textContent = 'by Incomplete'
    sortIncompleted.setAttribute('id', 'by_incomplete')
    sortIncompleted.value = 'Incomplete'
    const placeholder = document.createElement('option')
    placeholder.textContent = 'Select'

    //sort options
    sort.appendChild(placeholder)
    sort.appendChild(sortOldest)
    sort.appendChild(sortRecent)
    sort.appendChild(sortName)
    sort.appendChild(sortPriority)
    sort.appendChild(sortIncompleted)

    //load content
    parent.appendChild(sortDiv)
    sortDiv.appendChild(sortLable)
    sortDiv.appendChild(sort)

    // figure out sorting features later
    //for sorting functions
    let sortedProject = sortTasks(project)

    sort.addEventListener('click', (e)=>{
        let target = e.target
        switch(target.value){
            case 'Oldest':
                console.log('fizz')
                sortedProject.oldestArray()
                break
            case 'Recent':
                console.log('buzz')
                sortedProject.recentArray()
                break
            case 'Name':
                console.log('hmm')
                sortedProject.sortedName()
                break
            case 'Priority':
                console.log('hrrr')
                sortedProject.rankedPriority()
                break
            case 'Incomplete':
                sortedProject.sortIncomplete()
                break
        }
    })
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

function openEditForm(button, task, project){
    const editForm = document.querySelector('#edit-task-form')
    const taskName = document.querySelector('#edit_name')
    const taskDate = document.querySelector('#edit_date')
    const taskPrio = document.querySelector('#edit_priority')
    const taskDescription = document.querySelector('#edit_description')
    

    button.addEventListener('click', ()=>{
        editForm.showModal()
        console.log(task)
        taskName.value = task.name
        taskDate.value = task.dueDate
        taskPrio.value = task.priority
        taskDescription.value = task.description
        editTask(task, project)
    })

    editForm.addEventListener('click', (e)=>{
        if(e.target === editForm){
            editForm.close()
        }
    })
}

function openProjectEdit(button, project){
    const editProjectForm = document.querySelector('#edit-project-form')
    const projectName = document.querySelector('#edit_project_name')

    button.addEventListener('click', ()=>{
        editProjectForm.showModal()
        console.log(project)
        projectName.value = project.name
        editProject(project, editProjectForm)
    })

    editProjectForm.addEventListener('click', (e)=>{
        if(e.target === editProjectForm)
            editProjectForm.close()
    })
}

function editProject(project, modal){
    const submitBtn = document.querySelector('#edit_submit_project')
    const newProjectName = document.querySelector('#edit_project_name')
    const editForm = document.querySelector('#edit-project-input')

    submitBtn.addEventListener('click', ()=>{
        if(!editForm.checkValidity()){
            editForm.reportValidity()
            return
        }
        //console.log(newProjectName.value)
        let name = newProjectName.value
        if(name === 'General'){
            alert('Name already in use. Please use another name.')
        } else{
            project.renameProject(name)
            saveProjectState(project)
        }  
        modal.close()
    },{once:true})
}

function editTask(task, project){
    const editName = document.querySelector('#edit_name')
    const editDate = document.querySelector('#edit_date')
    const editDescription = document.querySelector('#edit_description')
    const editPriority = document.querySelector('#edit_priority')
    const modal = document.querySelector('#edit-task-form')
    const submit = document.querySelector('#submit-edit')
    const editForm = document.querySelector('#edit-task-input')

    submit.addEventListener('click', ()=>{
        if(!editForm.checkValidity()){
            editForm.reportValidity()
            return
        }
        let taskEdit = updateTask(task)
        taskEdit.changeName(editName.value)
        taskEdit.changeDueDate(editDate.value)
        taskEdit.changeDescription(editDescription.value)
        taskEdit.changePriority(editPriority.value)
        console.log(task)
        modal.close()
        saveProjectState(project)
    },{once:true})
}

//creates DOM content using form input
//need to also add tasks to their selected groups
function submitTask(){
    const taskModal = document.querySelector('#task-form')
    const submit = document.querySelector('#submit_task')
    const taskForm = document.querySelector('#task-input')
    
    const selectOption = document.querySelector('#task_group')
    submit.addEventListener('click', ()=>{
        if(!taskForm.checkValidity()){
            taskForm.reportValidity()
            return
        }

        //create task, add it to specific project
        let newTask = addTask()
        list.addTasktoProject(selectOption.value, newTask)
        //console.log(list.getProjects())
        taskForm.reset()
        taskModal.close()
    })
}

function submitProject(){
    const projectModal = document.querySelector('#project-form')
    const submit = document.querySelector('#submit_project')
    const projectGroupList = document.querySelector('#group-list')
    const taskGroupOptions = document.querySelector('#task_group')
    const projectForm = document.querySelector('#project-input')

    submit.addEventListener('click', ()=>{
        if(!projectForm.checkValidity()){
            projectForm.reportValidity()
            return
        }
        createProject()
        //reset these because loadNavList is going to append over them
        resetContent(projectGroupList)
        resetContent(taskGroupOptions)
        loadNavList(list)
        projectForm.reset()
        projectModal.close()
    })
}

//function used to create DOM elements for content
function createTaskElements(newTask, index, project){
    
    //Content elements
    const content = document.querySelector('#content')
    const taskCard = document.createElement('div')
    taskCard.classList.add('task-card')
    taskCard.setAttribute('data-index-number', index)
    //console.log(taskCard.dataset.indexNumber)
    const taskInfo = document.createElement('div')
    taskInfo.classList.add('task-info')
    taskInfo.value = 1
    const descriptionBox = document.createElement('div')
    descriptionBox.classList.add('task-description')

    //task elements
    const taskName = document.createElement('span')
    taskName.textContent = newTask.name
    const taskDate = document.createElement('span')
    //console.log(newTask.dueDate)
    if(newTask.dueDate === ''){
        taskDate.textContent = "---" //For clarity
    }else{
        taskDate.textContent = newTask.dueDate
    }
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
    
    markComplete(completedButton, newTask, project)
    openEditForm(edit, newTask, project)

    //Remove Dialog for task
    const confirmationModal = document.querySelector('#remove-confirmation')
    const confirmationButtons = document.querySelector('#remove-modal')
    let removalTarget = null

    remove.addEventListener('click', ()=>{
        removalTarget = index
        removeItemMessage(newTask.name)
        confirmationModal.showModal()
    })

    confirmationButtons.addEventListener('click', (event)=>{
        let target = event.target
        if(removalTarget != null){
            switch(target.id){
                case 'yes':
                    removeTask(removalTarget, project)
                    confirmationModal.close()
                    removalTarget = null
                    break
                case 'no':
                    confirmationModal.close()
                    removalTarget =null
                    break
            }
        }
    })

    
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

function removeTask(index, project){
    project.removeTask(index)
    saveProjectState(project)
}

function markComplete(button, task, project){
    let completionUpdate = updateTask(task)
    button.addEventListener('click', ()=>{
        //console.log(task)
        if(task.completed === false){
            completionUpdate.isComplete()
            //console.log(task)
            button.checked = true
            saveProjectState(project)
        }else{
            completionUpdate.isIncomplete()
            //console.log(task)
            button.checked = false
            saveProjectState(project)
        }
    })
}

//creates task from form inputs
function addTask(){
    //form elements
    const taskName = document.querySelector('#task_name')
    const dueDate = document.querySelector('#due_date')
    const taskDescription = document.querySelector('#task_description')
    const taskPriority = document.querySelector('#task_priority')

    //create task
    let name = taskName.value
    let date = dueDate.value
    let description = taskDescription.value
    let priority = taskPriority.value
    const task = new Task(name, date, description, priority)
    console.log(task)
    
    //IMPORTANT
    return task
}

function createProject(){
    const projectName = document.querySelector('#project_name')

    let name = projectName.value
    if(name === 'General'){
        alert('Name already in use. Please use another name.')
    } else{
        const project = new Project(name)
        list.addProjectToArray(project)
    }  
    //console.log(list.getProjects())
}

function saveProjectState(project){
    list.saveProjectList()
    contentLoad(project, project.array)
    loadNavList(list)
}

function removeItemMessage(item){
    const message = document.querySelector('#remove-message')
    message.textContent = 'Are you sure you want to remove "'+item+'" ?'
}


export {contentLoad, loadProject, submitTask, submitProject, resetContent, generateTaskCard}
import { contentLoad, resetContent, saveProjectState } from "./content"

//module for our tasks and task related functions
class Task{
    constructor(name, dueDate, description, priority = 0, completed = false ){
        this.name = name
        this.dueDate = dueDate
        this.description = description
        this.completed = completed
        this.priority = priority
    }

    //better than just printing true/false
    checkCompletion(){
        if(this.completed === true){
            return 'Completed'
        }else{
            return 'Incomplete'
        }
    }

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
    
    //IMPORTANT
    return task
}

//updates all properties of the task
function updateTask(task){
    const changeName = (newName) => task.name = newName
    const changeDescription = (newDescription) => task.description = newDescription
    const changeDueDate = (newDueDate) => task.dueDate = newDueDate
    const isComplete = () => task.completed = true
    const isIncomplete = () => task.completed = false
    const changePriority = (newPriority) => task.priority = newPriority
    
    //For a diff apporach to priority change
    // const raisePriority = () => task.priority +=1
    // const lowerPriority = () => task.priority -=1

    return {changeName, changeDescription, changeDueDate, isComplete, isIncomplete, changePriority}
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
        modal.close()
        saveProjectState(project)
    },{once:true})
}

function removeTask(index, project){
    project.removeTask(index)
    saveProjectState(project)
}

function sortTasks(project){
    const content = document.querySelector('#content')
    const oldestArray = () => contentLoad(project, project.array)
    const recentArray = () => {
        let recentCopy = [...project.array]
        contentLoad(project, recentCopy.reverse())
    }
    //Sorts greated prio and puts at top of list
    const rankedPriority = () => {
        let rankedCopy = [...project.array]
        let rankedArray = rankedCopy.sort((a, b) => b.priority - a.priority)
        resetContent(content)
        contentLoad(project, rankedArray)
    }
    //sort tasks alphabetically
    const sortedName = () =>{
        let namedCopy = [...project.array]
        let sortedArray = namedCopy.sort((a, b) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }
            return 0
        })

        contentLoad(project, sortedArray)
    }

    const byDate = () =>{
        let dateCopy = [...array]
        let sortedDate = dateCopy.sort((a,b) =>{
            //need a consistend date format before we can do logic
        })
    }
    //puts incomplete tasks at the top of the list
    const sortIncomplete = () =>{
        let incompleteCopy = [...project.array]
        let sortIncomplete = incompleteCopy.sort((a) =>{
            if(a.completed === false){
                return -1
            }
            return 1
        })
        contentLoad(project, sortIncomplete)
    }
    return{rankedPriority, sortedName, sortIncomplete, oldestArray, recentArray}
}

function markComplete(button, task, project){
    let completionUpdate = updateTask(task)
    button.addEventListener('click', ()=>{
        if(task.completed === false){
            completionUpdate.isComplete()
            button.checked = true
            saveProjectState(project)
        }else{
            completionUpdate.isIncomplete()
            button.checked = false
            saveProjectState(project)
        }
    })
}

export {Task, updateTask, sortTasks, addTask, editTask, removeTask, markComplete}
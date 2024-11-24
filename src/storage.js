import { list } from "."
import { Task } from "./todos"
import { Project } from "./project"
import { contentLoad } from "./content"

//Module for localstorage related functions

//to reset data during testing
//localStorage.clear()

//Local Storage should only have one key
function checkLocalStorage(item){
    let rawItem = JSON.parse(item)
    let masterList = []
    for(let i=0; i<rawItem.length; i++){
        masterList.push(rawItem[i])
    }
    return masterList
}

//recreate all of our projects/tasks from the master list
function makeProjects(array){
    let starter = []
    for(let i=0; i<(array.length); i++){
        let rawProject = array[i]
        let newProject = loadJSONProjects(rawProject)
        list.addProjectToArray(newProject)
        starter.push(newProject)
    }
    //Initialize our DOM content assuming localstorage is populated
    contentLoad(starter[0], starter[0].array)
}

function loadJSONProjects(project){
    const rawObject = project
    let taskArray = []
    for(let i=0; i<rawObject.array.length; i++){
        let task = rawObject.array[i]
        let name = task.name
        let date = task.dueDate
        let description = task.description
        let completion = task.completed
        let priority = task.priority
        const newTask = new Task(name, date, description, priority, completion)
        taskArray.push(newTask)  
    }
    const newProject = new Project(rawObject.name, taskArray)

    return newProject
}

function initializeList(){
    if(localStorage.length === 0){
        const general = new Project ('General')
        list.addProjectToArray(general)
        contentLoad(general)
    } else{
        const localList = localStorage.getItem('list')
        const masterList = checkLocalStorage(localList)
        makeProjects(masterList)
    }
    
}


export {checkLocalStorage, makeProjects, initializeList}
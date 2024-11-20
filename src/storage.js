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
    //console.log(rawItem)
    let masterList = []
    for(let i=0; i<rawItem.length; i++){
        masterList.push(rawItem[i])
    }
    //console.log(masterList)
    return masterList
}

//recreate all of our projects/tasks from the master list
function makeProjects(array){
    let starter = []
    for(let i=0; i<(array.length); i++){
        let rawProject = array[i]
        //console.log(rawProject)
        let newProject = loadJSONProjects(rawProject)
        list.addProjectToArray(newProject)
        //console.log(list.getProjects())
        starter.push(newProject)
    }
    //Initialize our DOM content assuming localstorage is populated
    contentLoad(starter[0])
}

function loadJSONProjects(project){
    const rawObject = project
    //console.log(rawObject.array)
    let taskArray = []
    // const newProjectLength = newProject.array.length
    for(let i=0; i<rawObject.array.length; i++){
        let task = rawObject.array[i]
        let name = task.name
        let date = task.dueDate
        let description = task.description
        let completion = task.completed
        let priority = task.priority
        const newTask = new Task(name, date, description, completion, priority)
        taskArray.push(newTask)  
        //newProject.addToArray(newTask)
        //console.log(newTask)
    }
    //console.log(taskArray)
    const newProject = new Project(rawObject.name, taskArray)

    return newProject
}

export {checkLocalStorage, makeProjects}
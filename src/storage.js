import { list } from "."
import { Task } from "./todos"
import { Project } from "./project"

//Module for localstorage related functions

//to reset data during testing
//localStorage.clear() 
function checkLocalStorage(){
    for(let i=0; i<(localStorage.length); i++){
        let rawProject = localStorage.getItem(localStorage.key(i))
        console.log(rawProject)
        let newProject = loadJSONProjects(rawProject)
        list.addProjectToArray(newProject)
        console.log(list.getProjects())
    }
}

function loadJSONProjects(project){
    const rawObject = JSON.parse(project)
    //console.log(rawObject.array)
    let taskArray = []
    // const newProjectLength = newProject.array.length
    for(let i=0; i<rawObject.array.length; i++){
        let task = rawObject.array[i]
        let name = task.name
        let date = task.dueDate
        let description = task.description
        const newTask = new Task(name, date, description)
        taskArray.push(newTask)  
        //newProject.addToArray(newTask)
        //console.log(newTask)
    }
    //console.log(taskArray)
    const newProject = new Project(rawObject.name, taskArray)

    return newProject
}

export {loadJSONProjects, checkLocalStorage}
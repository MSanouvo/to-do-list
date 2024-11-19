import "./style.css"
import { Task, updateTask, sortTasks } from "./todos"
import { Project, projectList } from "./project"
import { loadNavList } from "./navbar-list"
import { contentLoad, submitTask, submitProject } from "./content.js"

//Main module, should hold important variables and load content w/ other modules
//may only need to import load functions by the end of writing this program

export const list = projectList() //needed variable ?
// LOCALSTORAGE TEST VAR
const december = loadJSONProjects(localStorage.getItem('December Projects'))
//const endOfYear = loadJSONProjects(localStorage.getItem('End of Year Projects'))
checkLocalStorage()

// TEST VAR
//const december = new Project('December Projects') //test variable
//const endOfYear = new Project('End of Year Projects') //test variable
// list.addProjectToArray(december)
// list.addProjectToArray(endOfYear)
const sleep = new Task('sleep', '11pm', 'eepy') //test variable
const gym = new Task('gym', '7pm', 'gains') //test variable
//december.addToArray(sleep)
//december.addToArray(gym)
//december.showArray()

// const general = new Project ('General')
// const general = loadJSONProjects(localStorage.getItem('General'))
//const projects = loadJSONProjects(localStorage.getItem('Projects'))
// list.addProjectToArray(general)



//load DOMs content
contentLoad(december)
loadNavList(list)
submitTask()
submitProject()

function checkLocalStorage(){
    for(let i=0; i<localStorage.length; i++){
        let rawProject = localStorage.getItem(localStorage.key(i))
        console.log(rawProject)
        let newProject = loadJSONProjects(rawProject)
        list.addProjectToArray(newProject)
        console.log(list.getProjects())
    }
}



loadJSONProjects(localStorage.getItem('December Projects'))
function loadJSONProjects(project){
    const rawObject = JSON.parse(project)
    console.log(rawObject.array)
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
        console.log(newTask)
    }
    console.log(taskArray)
    const newProject = new Project(rawObject.name, taskArray)

    return newProject
}

//localStorage.clear()

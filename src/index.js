import "./style.css"
import { Task, updateTask, sortTasks } from "./todos"
import { Project, projectList } from "./project"
import { loadNavList } from "./navbar-list"
import { contentLoad, submitTask, submitProject } from "./content.js"
import { loadJSONProjects, checkLocalStorage, makeProjects } from "./storage.js"

//Main module, should hold important variables and load content w/ other modules
//may only need to import load functions by the end of writing this program

// MAIN VARIABLES
export const list = projectList()

// NEED TO MAKE THIS CONDITIONAL SO IF LOCALSTORAGE IS EMPTY IT'LL RUN
// if local storage is empty
// INITIAL VAR (USE ONCE AFTER RESETTING LOCAL STORAGE)
// const general = new Project ('General')
// list.addProjectToArray(general)
// contentLoad(general)
// else
const localList = localStorage.getItem('list')
const masterList = checkLocalStorage(localList)
makeProjects(masterList)


//load DOMs content
loadNavList(list)
submitTask()
submitProject()


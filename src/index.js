import "./style.css"
import { Task, updateTask, sortTasks } from "./todos"
import { Project, projectList } from "./project"
import { loadNavList } from "./navbar-list"
import { contentLoad, submitTask, submitProject } from "./content.js"
import { loadJSONProjects, checkLocalStorage } from "./storage.js"

//Main module, should hold important variables and load content w/ other modules
//may only need to import load functions by the end of writing this program
testStorage()
export const list = projectList() //needed variable ?
// LOCALSTORAGE TEST VAR
//const december = loadJSONProjects(localStorage.getItem('December Projects'))
//const endOfYear = loadJSONProjects(localStorage.getItem('End of Year Projects'))


//const general = new Project ('General')
const general = loadJSONProjects(localStorage.getItem('General'))
//list.addProjectToArray(general)
checkLocalStorage()

function testStorage(){
    for(let i=0; i<(localStorage.length); i++){
        console.log(localStorage.key(i))
    }
}

//load DOMs content
contentLoad(general)
loadNavList(list)
submitTask()
submitProject()




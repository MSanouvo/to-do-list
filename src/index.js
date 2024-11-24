import "./style.css"
import { projectList } from "./project"
import { loadNavList } from "./navbar-list"
import { contentLoad, submitTask, submitProject } from "./content.js"
import { initializeList} from "./storage.js"

//Main module, should hold important variables and load content w/ other modules
//may only need to import load functions by the end of writing this program

// MAIN VARIABLES
export const list = projectList()
initializeList()

//load DOMs content
loadNavList(list)
submitTask()
submitProject()


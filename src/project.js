import { contentLoad, loadProject } from "./content"

//this module should house any function related to projects(groups of tasks)

class Project{
    constructor(arrayName, array = []){
        this.name = arrayName
        this.array = array
    }

    addToArray(task){
        // task.saveTask()
        this.array.push(task)
        this.saveProject()
    }
    //mostly used for testing
    showArray(){
        console.log(this.array)
        this.array.forEach((task)=>{
            console.log(task.name)
            console.log(task.priority)
        })  
    }

    saveProject(){
        localStorage.setItem(this.name, JSON.stringify(this))
    }
}

function projectList(){
    const projects = []
    const addProjectToArray = (project) =>{
        projects.push(project)
        project.saveProject()
    }
    const getProjects = () => projects

    //for the form to add task to selected project
    //need to figure out how to implement this factory object onto our other functions/modules
    //see if we can make this without relying on a factory
    const addTasktoProject = (project_name, task) =>{
        for(let i=0; i<projects.length; i++){
            if(projects[i].name === project_name){
                projects[i].addToArray(task)
                projects[i].saveProject()
                //load project with new task
                loadProject(projects[i])
            }
        }
    }
    const showProjects = () => console.log(projects)

    return {showProjects, addProjectToArray, addTasktoProject, getProjects}
}


export{Project, projectList}
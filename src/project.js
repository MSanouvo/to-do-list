import { contentLoad, loadProject } from "./content"

//this module should house any function related to projects(groups of tasks)

class Project{
    constructor(arrayName, array = []){
        this.name = arrayName
        this.array = array
        this.value = 0
    }

    addToArray(task){
        this.array.push(task)
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
    removeTask(index){
        console.log(this.array[index])
        this.array.splice(index, 1)
    }

    renameProject(newName){
        this.name = newName
    }
    setValue(value){
        this.value = value
    }
}

function projectList(){
    let projects = []
    const addProjectToArray = (project) =>{
        projects.push(project)
        //project.saveProject()
        saveProjectList()
    }
    const getProjects = () => projects

    //for the form to add task to selected project
    //need to figure out how to implement this factory object onto our other functions/modules
    //see if we can make this without relying on a factory
    const addTasktoProject = (project_name, task) =>{
        for(let i=0; i<projects.length; i++){
            if(projects[i].name === project_name){
                projects[i].addToArray(task)

                contentLoad(projects[i], projects[i].array)
                saveProjectList()
            }
        }
    }

    const removeProject = (project) =>{
        console.log(projects.length)
        let filteredArray = []
        for(let i=0; i<projects.length; i++){
            if(projects[i].name != project.name){
                filteredArray.push(projects[i])
            }
        }
        projects = filteredArray
        console.log(filteredArray)
        saveProjectList()
        contentLoad(projects[0], projects[0].array)
    }
    const showProjects = () => console.log(projects)
    const saveProjectList = () => localStorage.setItem('list', JSON.stringify(projects))

    return {showProjects, addProjectToArray, addTasktoProject, getProjects, saveProjectList, removeProject}
}

export{Project, projectList}
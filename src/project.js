import { contentLoad, saveProjectState } from "./content"
import { list } from "."

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
        saveProjectList()
    }
    const getProjects = () => projects

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
        let filteredArray = []
        for(let i=0; i<projects.length; i++){
            if(projects[i].name != project.name){
                filteredArray.push(projects[i])
            }
        }
        projects = filteredArray
        saveProjectList()
        contentLoad(projects[0], projects[0].array)
    }
    const showProjects = () => console.log(projects)
    const saveProjectList = () => localStorage.setItem('list', JSON.stringify(projects))

    return {showProjects, addProjectToArray, addTasktoProject, getProjects, saveProjectList, removeProject}
}

function createProject(){
    const projectName = document.querySelector('#project_name')

    let name = projectName.value
    if(name === 'General'){
        alert('Name already in use. Please use another name.')
    } else{
        const project = new Project(name)
        list.addProjectToArray(project)
    }  
}

function setActiveProject(project){
    const listElement = document.getElementsByClassName('group')
    for(let l=0; l<listElement.length; l++){
        if(listElement[l].textContent === project.name){
            console.log('foo')
            listElement[l].setAttribute('id', 'active')
        } else{
            listElement[l].setAttribute('id', 'inactive')
        }
    }
}

function editProject(project, modal){
    const submitBtn = document.querySelector('#edit_submit_project')
    const newProjectName = document.querySelector('#edit_project_name')
    const editForm = document.querySelector('#edit-project-input')

    submitBtn.addEventListener('click', ()=>{
        if(!editForm.checkValidity()){
            editForm.reportValidity()
            return
        }
        let name = newProjectName.value
        if(name === 'General'){
            alert('Name already in use. Please use another name.')
        } else{
            project.renameProject(name)
            saveProjectState(project)
        }  
        modal.close()
    },{once:true})
}

export{Project, projectList, setActiveProject, createProject, editProject}
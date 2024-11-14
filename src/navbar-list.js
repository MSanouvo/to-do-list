import { projectList } from "./project"
const list = projectList()

function addGroupToList(project){
    const list = document.querySelector('#group-list')
    const newGroup = document.createElement('li')
    newGroup.textContent = project.name
    newGroup.classList.add('group')

    const taskGroup = document.querySelector('#task_group')
    const groupOption = document.createElement('option')
    groupOption.value = project.name
    groupOption.textContent = project.name
    
    taskGroup.appendChild(groupOption)
    list.appendChild(newGroup)
}

function loadNavList(){
    //dynamically generate projects in navbar based on the list of projects
}

export{addGroupToList}
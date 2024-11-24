//Module for nav bar elements
import { contentLoad, resetContent } from "./content"
function addGroupToList(project, index){
    const groupList = document.querySelector('#group-list')
    const newGroup = document.createElement('li')
    newGroup.textContent = project.name
    newGroup.classList.add('group')
    project.setValue(index)
    if(project.name === 'General'){
        newGroup.setAttribute('id', 'active')
    } else{
        newGroup.setAttribute('id', 'inactive')
    }

    const taskGroup = document.querySelector('#task_group')
    const groupOption = document.createElement('option')
    groupOption.value = project.name
    groupOption.textContent = project.name
    
    taskGroup.appendChild(groupOption)
    groupList.appendChild(newGroup)

    //currently, event listener is activating multiple times

           
}

function loadNavList(list){
    //dynamically generate projects in navbar based on the list of projects
    //loop through main project array and use above function for each project
    const groupList = document.querySelector('#group-list')
    resetContent(groupList)
    const taskGroup = document.querySelector('#task_group')
    resetContent(taskGroup)


    groupList.addEventListener('click', (e)=>{
        let target = e.target.textContent
        const listArray = list.getProjects()
        for(let i=0; i<listArray.length; i++){
            if(listArray[i].name === target){
                contentLoad(listArray[i], listArray[i].array)
            }
        }
    }) 
    
    for(let i=0; i<list.getProjects().length; i++){
        addGroupToList(list.getProjects()[i], i)
    }
}

export{loadNavList}
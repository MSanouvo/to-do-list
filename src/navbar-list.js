//Module for nav bar elements
import { contentLoad, submitProject, submitTask, resetContent } from "./content"
function addGroupToList(project){
    const groupList = document.querySelector('#group-list')
    const newGroup = document.createElement('li')
    newGroup.textContent = project.name
    newGroup.classList.add('group')

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

    // ADD REMOVE PROJECT FUNCTION SOMEWHERE IN HERE, MAKE SURE IT DOESN'T FIRE MULTIPLE TIMES I DON'T WANT MY PROJECT DELETED
    // MAYBE ADD THIS FUNCTIONALITY LAST

    groupList.addEventListener('click', (e)=>{
        console.log(e.target.textContent)
        let target = e.target.textContent
        const listArray = list.getProjects()
        for(let i=0; i<listArray.length; i++){
            if(listArray[i].name === target){
                contentLoad(listArray[i])
            }
        }
    }) 
    
    list.getProjects().forEach(element => {
        addGroupToList(element)
        
    });  
}

export{loadNavList}
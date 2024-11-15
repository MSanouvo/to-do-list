//Module for nav bar elements
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

function loadNavList(list){
    //dynamically generate projects in navbar based on the list of projects
    //loop through main project array and use above function for each project
    list.getProjects().forEach(element => {
        addGroupToList(element)
    });  
}

export{loadNavList}
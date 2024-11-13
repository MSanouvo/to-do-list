function addGroupToList(project){
    const list = document.querySelector('#group-list')

    const newGroup = document.createElement('li')
    newGroup.textContent = project.name
    newGroup.classList.add('group')
        
    list.appendChild(newGroup)
}

function submitNewTask(){
    //get input variables from form and use them to make a new task object
}

export{addGroupToList}
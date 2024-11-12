function addGroupToList(project){
    const list = document.querySelector('#group-list')

    const newGroup = document.createElement('li')
    newGroup.textContent = project.name
    newGroup.classList.add('group')
        
    list.appendChild(newGroup)
}

export{addGroupToList}
class Project{
    constructor(arrayName){
        this.name = arrayName
        this.array = []
    }

    addToArray(task){
        this.array.push(task)
    }
    //mostly used for testing
    showArray(){
        let length = this.array.length
        console.log(this.array)
        for(let i=0; i<length; i++){
            console.log(this.array[i].name)
            console.log(this.array[i].priority)
        }
        
    }
}

function projectList(){
    const projects = []
    const addProjectToArray = (project) => projects.push(project)

    const addTasktoProject = (project_name, task) =>{
        for(let i=0; i<projects.length; i++){
            if(projects[i].name === project_name){
                projects[i].addToArray(task)
            }
        }
    }
    
    const showProjects = () => console.log(projects)

    return {showProjects, addProjectToArray, addTasktoProject}
}


export{Project, projectList}
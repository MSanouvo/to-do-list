import { contentLoad, resetContent } from "./content"

//module for our tasks and task related functions
class Task{
    constructor(name, dueDate, description, priority = 0, completed = false ){
        this.name = name
        this.dueDate = dueDate
        this.description = description
        this.completed = completed
        this.priority = priority
    }

    //better than just printing true/false
    checkCompletion(){
        if(this.completed === true){
            //console.log('Completed!')
            return 'Completed'
        }else{
            //console.log('Incomplete')
            return 'Incomplete'
        }
    }

}
//updates all properties of the task
function updateTask(task){
    const changeName = (newName) => task.name = newName
    const changeDescription = (newDescription) => task.description = newDescription
    const changeDueDate = (newDueDate) => task.dueDate = newDueDate
    const isComplete = () => task.completed = true
    const isIncomplete = () => task.completed = false
    const changePriority = (newPriority) => task.priority = newPriority
    // const raisePriority = () => task.priority +=1
    // const lowerPriority = () => task.priority -=1

    return {changeName, changeDescription, changeDueDate, isComplete, isIncomplete, changePriority}
}

function sortTasks(project){
    const content = document.querySelector('#content')
    const oldestArray = () => contentLoad(project, project.array)
    const recentArray = () => {
        let recentCopy = [...project.array]
        contentLoad(project, recentCopy.reverse())
    }
    //Sorts greated prio and puts at top of list
    const rankedPriority = () => {
        let rankedCopy = [...project.array]
        let rankedArray = rankedCopy.sort((a, b) => b.priority - a.priority)
        console.log(rankedArray)
        resetContent(content)
        contentLoad(project, rankedArray)
    }
    //sort tasks alphabetically
    const sortedName = () =>{
        let namedCopy = [...project.array]
        let sortedArray = namedCopy.sort((a, b) => {
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }
            return 0
        })
        console.log(sortedArray)
        contentLoad(project, sortedArray)
    }

    const byDate = () =>{
        let dateCopy = [...array]
        let sortedDate = dateCopy.sort((a,b) =>{
            //need a consistend date format before we can do logic
        })
    }
    //puts incomplete tasks at the top of the list
    const sortIncomplete = () =>{
        let incompleteCopy = [...project.array]
        let sortIncomplete = incompleteCopy.sort((a) =>{
            if(a.completed === false){
                return -1
            }
            return 1
        })
        console.log(sortIncomplete)
        contentLoad(project, sortIncomplete)
    }
    return{rankedPriority, sortedName, sortIncomplete, oldestArray, recentArray}
}

export {Task, updateTask, sortTasks}
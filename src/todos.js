import { contentLoad } from "./content"

//module for our tasks and task related functions
class Task{
    constructor(name, dueDate, description){
        this.name = name
        this.dueDate = dueDate
        this.description = description
        this.completed = false
        this.priority = 0
    }

    //better than just printing true/false
    checkCompletion(){
        if(this.completed === true){
            console.log('Completed!')
            return 'Completed'
        }else{
            console.log('Incomplete')
            return 'Incomplete'
        }
    }

    // saveTask(){
    //     localStorage.setItem(this.name, JSON.stringify(this))
    // }
}
//updates all properties of the task
function updateTask(task){
    const changeName = (newName) => task.name = newName
    const changeDescription = (newDescription) => task.description = newDescription
    const changeDueDate = (newDueDate) => task.dueDate = newDueDate
    const isComplete = () => task.completed = true
    const isIncomplete = () => task.completed = false
    const raisePriority = () => task.priority +=1
    const lowerPriority = () => task.priority -=1

    return {changeName, changeDescription, changeDueDate, isComplete, isIncomplete, raisePriority, lowerPriority}
}

function sortTasks(array){
    //sort in descending order (greatest -> least prio)
    const recentArray = () => contentLoad(array)
    const rankedPriority = () => {
        let rankedCopy = [...array]
        let rankedArray = rankedCopy.sort((a, b) => b.priority - a.priority)
        console.log(rankedArray)
        contentLoad(rankedArray)
    }
    //sort tasks alphabetically
    const sortedName = () =>{
        let namedCopy = [...array]
        let sortedArray = namedCopy.sort((a, b) => {
            if(a.name < b.name){
                return -1
            }
            if(a.name > b.name){
                return 1
            }
            return 0
        })
        console.log(sortedArray)
        contentLoad(sortedArray)
    }

    const byDate = () =>{
        let dateCopy = [...array]
        let sortedDate = dateCopy.sort((a,b) =>{
            //need a consistend date format before we can do logic
        })
    }
    //puts incomplete tasks at the top of the list
    const sortIncomplete = () =>{
        let incompleteCopy = [...array]
        let sortIncomplete = incompleteCopy.sort((a) =>{
            if(a.completed === false){
                return -1
            }
            return 1
        })
        console.log(sortIncomplete)
        contentLoad(sortIncomplete)
    }
    return{rankedPriority, sortedName, sortIncomplete, recentArray}
}

export {Task, updateTask, sortTasks}